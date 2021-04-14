import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as UnitActions from './unit.actions';
import { UnitEntity } from './unit.models';

export const UNIT_FEATURE_KEY = 'unit';

export interface State extends EntityState<UnitEntity> {
  selectedId?: string | number; // which Unit record has been selected
  loaded: boolean; // has the Unit list been loaded
  error?: string | null; // last known error (if any)
}

export interface UnitPartialState {
  readonly [UNIT_FEATURE_KEY]: State;
}

export const unitAdapter: EntityAdapter<UnitEntity> = createEntityAdapter<UnitEntity>();

export const initialState: State = unitAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const unitReducer = createReducer(
  initialState,
  on(UnitActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(UnitActions.loadUnitSuccess, (state, { unit }) =>
    unitAdapter.setAll(unit, { ...state, loaded: true })
  ),
  on(UnitActions.loadUnitFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return unitReducer(state, action);
}
