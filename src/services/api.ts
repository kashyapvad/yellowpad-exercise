import axios from 'axios';
import { PARSE_CONTRACT_TEXT_ENDPOINT, PARSE_INSTRUCTION_ENDPOINT } from '@/constants/api';

export async function parseContractText(text: string) {
  const formData = new FormData();
  formData.append('text', text);
  try {
    const response = await axios.post(PARSE_CONTRACT_TEXT_ENDPOINT, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to parse contract');
  }
}

export async function parseInstruction(contract_json: any, instruction: string, clause: string) {
  console.log('[parseInstruction] Sending:', { contract_json, instruction, clause });
  try {
    const response = await axios.post(PARSE_INSTRUCTION_ENDPOINT, {
      contract_json,
      instruction,
      clause,
    });
    console.log('[parseInstruction] Response from backend:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('[parseInstruction] Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to parse instruction');
  }
} 