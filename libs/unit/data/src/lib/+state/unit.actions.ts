import { createAction, props } from '@ngrx/store';
import { UnitEntity } from './unit.models';

export const init = createAction('[Unit Page] Init');

export const loadUnitSuccess = createAction(
  '[Unit/API] Load Unit Success',
  props<{ unit: UnitEntity[] }>()
);

export const loadUnitFailure = createAction(
  '[Unit/API] Load Unit Failure',
  props<{ error: any }>()
);
