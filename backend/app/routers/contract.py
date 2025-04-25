from fastapi import APIRouter, UploadFile, File, HTTPException, Form, Request, Depends
from starlette.responses import JSONResponse, StreamingResponse
import uuid
from typing import List, Optional
from docx import Document
import io
import re
import os
import openai
import json
from backend.app.services.contract_service import (
    parse_docx_service,
    parse_contract_text_service,
    parse_instruction_service
)
from backend.app.schemas.contract import (
    ParseDocxRequest, ParseDocxResponse,
    ParseContractTextRequest, ParseContractTextResponse,
    ParseInstructionRequest, ParseInstructionResponse
)
import logging

logger = logging.getLogger("contract_router")

router = APIRouter()

# Helper functions for normalization

def extract_section_number(text: str) -> Optional[str]:
    match = re.match(r"^\s*([0-9]+[A-Za-z]?|[A-Z]|[IVXLCDM]+)[.\t\s]+", text)
    return match.group(1) if match else None

def strip_section_number(text: str) -> str:
    return re.sub(r"^\s*([0-9]+[A-Za-z]?|[A-Z]|[IVXLCDM]+)[.\t\s]+", "", text).strip()

def is_all_caps(text: str) -> bool:
    letters = ''.join([c for c in text if c.isalpha()])
    return len(letters) >= 3 and letters.isupper()

def extract_contract_text(doc: Document) -> str:
    return "\n".join([p.text for p in doc.paragraphs if p.text.strip()])

LLM_PARSE_PROMPT = '''
You are a contract parser. Given the following contract text, extract a list of sections. Each section should be an object with:
- id: a unique string (can be a UUID or hash)
- type: 'heading', 'subheading', or 'clause'
- content: the text of the section (without the section number)
- level: 1 for main headings, 2 for subheadings, 1 for clauses
- number: the section number or label, if present (e.g., '1', 'A', '1A')
Respond ONLY with valid JSON. Do NOT include any explanation, markdown, code block, or text outside the JSON. Do NOT wrap your response in triple backticks or say "here is your JSON". Output ONLY the raw JSON array.
Contract text:
"""
{contract_text}
"""
'''

LLM_INSERT_PROMPT = '''
You are a contract editor. Given the following contract text, and this instruction and clause, return the updated contract as a single string of the full contract text, with the clause inserted in the correct place.
- Instruction: {instruction}
- Clause: {clause}
Respond ONLY with valid JSON in the following format:
{{
  "updated_contract": "Full contract text here, with all headings, clauses, and the new clause inserted in the correct place."
}}
IMPORTANT:
- Escape all double quotes in the contract text with a backslash (\").
- Do NOT include any explanation, markdown, code block, or text outside the JSON.
- Do NOT wrap your response in triple backticks or say "here is your JSON".
- Output ONLY the raw JSON object as shown above.
- If you add any extra text, unescaped quotes, or incomplete JSON, the system will break.
- Ensure the JSON is complete and valid.
Contract text:
"""
{contract_text}
"""
'''

def safe_parse_llm_response(llm_content: str):
    match = re.search(r'"updated_contract"\s*:\s*"((?:[^"\\]|\\.)*)"', llm_content, re.DOTALL)
    if not match:
        raise ValueError("Could not find updated_contract in LLM response")
    value = match.group(1)
    value_fixed = re.sub(r'(?<!\\)"', r'\\"', value)
    fixed_json = '{"updated_contract": "%s"}' % value_fixed
    return json.loads(fixed_json)

@router.post("/api/parse-docx", response_model=ParseDocxResponse)
async def parse_docx(
    file: UploadFile = File(...),
    instruction: Optional[str] = Form(None),
    clause: Optional[str] = Form(None),
):
    try:
        contents = await file.read()
        result = parse_docx_service(contents, instruction, clause)
        return ParseDocxResponse(**result)
    except Exception as e:
        logger.exception("Error in /api/parse-docx")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/api/parse-contract-text", response_model=ParseContractTextResponse)
async def parse_contract_text(text: str = Form(...)):
    try:
        result = parse_contract_text_service(text)
        return ParseContractTextResponse(**result)
    except Exception as e:
        logger.exception("Error in /api/parse-contract-text")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/api/parse-instruction", response_model=ParseInstructionResponse)
async def parse_instruction(request: Request):
    try:
        data = await request.json()
        logger.info(f"Received /api/parse-instruction request: {data}")
        contract_json = data.get('contract_json')
        instruction = data.get('instruction')
        clause = data.get('clause')
        if not contract_json or not instruction or not clause:
            logger.warning("Missing contract_json, instruction, or clause in request body")
            raise HTTPException(status_code=400, detail="Missing contract_json, instruction, or clause.")
        result = parse_instruction_service(contract_json, instruction, clause)
        logger.info("parse_instruction_service result: %s", result)
        return ParseInstructionResponse(**result)
    except Exception as e:
        logger.exception("Error in /api/parse-instruction")
        raise HTTPException(status_code=500, detail=str(e)) 