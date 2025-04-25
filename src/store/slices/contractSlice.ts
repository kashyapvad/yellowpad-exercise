import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contract, ContractSection } from '@/types/contract';

interface ContractState {
  entities: Record<string, ContractSection>;
  ids: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  lastInsertedClauseId: string | null;
  contractId: string | null;
  title: string | null;
}

const initialState: ContractState = {
  entities: {},
  ids: [],
  status: 'idle',
  error: null,
  lastInsertedClauseId: null,
  contractId: null,
  title: null,
};

function normalizeSections(sections: ContractSection[]) {
  const entities: Record<string, ContractSection> = {};
  const ids: string[] = [];
  for (const section of sections) {
    entities[section.id] = section;
    ids.push(section.id);
  }
  return { entities, ids };
}

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setContract(state, action: PayloadAction<Contract>) {
      const { entities, ids } = normalizeSections(action.payload.sections);
      state.entities = entities;
      state.ids = ids;
      state.contractId = action.payload.id;
      state.title = action.payload.title;
      state.lastInsertedClauseId = null;
      state.status = 'succeeded';
      state.error = null;
    },
    insertClause(
      state,
      action: PayloadAction<{ clause: ContractSection; insertIndex: number }>
    ) {
      const { clause, insertIndex } = action.payload;
      state.entities[clause.id] = clause;
      state.ids.splice(insertIndex, 0, clause.id);
      state.lastInsertedClauseId = clause.id;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = 'failed';
    },
    clearError(state) {
      state.error = null;
      state.status = 'idle';
    },
  },
});

export const { setContract, insertClause, setError, clearError } = contractSlice.actions;
export default contractSlice.reducer; 