import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  UNIT_FEATURE_KEY,
  State,
  UnitPartialState,
  unitAdapter,
} from './unit.reducer';

// Lookup the 'Unit' feature state managed by NgRx
export const getUnitState = createFeatureSelector<UnitPartialState, State>(
  UNIT_FEATURE_KEY
);

const { selectAll, selectEntities } = unitAdapter.getSelectors();

export const getUnitLoaded = createSelector(
  getUnitState,
  (state: State) => state.loaded
);

export const getUnitError = createSelector(
  getUnitState,
  (state: State) => state.error
);

export const getAllUnit = createSelector(getUnitState, (state: State) =>
  selectAll(state)
);

export const getUnitEntities = createSelector(getUnitState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getUnitState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getUnitEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
