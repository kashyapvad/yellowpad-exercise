import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

// Base selector
const selectContractState = (state: RootState) => state.contract;

// All sections as an ordered array
export const selectAllSections = createSelector(
  [selectContractState],
  (contract) => contract.ids.map(id => contract.entities[id])
);

// Section by ID
export const selectSectionById = (id: string) =>
  createSelector([selectContractState], contract => contract.entities[id]);

// Error
export const selectContractError = createSelector(
  [selectContractState],
  (contract) => contract.error
);

// Status
export const selectContractStatus = createSelector(
  [selectContractState],
  (contract) => contract.status
);

// Last inserted clause ID
export const selectLastInsertedClauseId = createSelector(
  [selectContractState],
  (contract) => contract.lastInsertedClauseId
);

// Contract ID
export const selectContractId = createSelector(
  [selectContractState],
  (contract) => contract.contractId
);

// Contract title
export const selectContractTitle = createSelector(
  [selectContractState],
  (contract) => contract.title
); 