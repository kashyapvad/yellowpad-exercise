# Pydantic schemas for contract endpoints will go here. 

from pydantic import BaseModel, Field, RootModel
from typing import List, Optional, Any

class ContractSection(BaseModel):
    id: str
    type: str
    content: str
    level: int
    number: Optional[str] = None
    style: Optional[Any] = None

class Contract(BaseModel):
    id: str
    title: str
    sections: List[ContractSection]

class ParseDocxRequest(BaseModel):
    instruction: Optional[str] = None
    clause: Optional[str] = None

class ParseDocxResponse(BaseModel):
    contract_text: Optional[str] = None
    updated_contract: Optional[str] = None

class ParseContractTextRequest(BaseModel):
    text: str

class ParseContractTextResponse(BaseModel):
    id: str
    title: str
    sections: List[ContractSection]

class ParseInstructionRequest(BaseModel):
    contract_json: Any
    instruction: str
    clause: str

class ParseInstructionResponse(BaseModel):
    targetType: str
    targetNumber: str
    targetContent: str
    position: str
    childType: str
    childNumber: str
    content: Optional[str] = None
    contentPosition: Optional[str] = None
    style: Optional[Any] = None 