import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as IngredientsActions from './ingredients.actions';
import { IngredientEntity } from './ingredients.models';

export const INGREDIENTS_FEATURE_KEY = 'ingredients';

export interface State extends EntityState<IngredientEntity> {
  selectedId?: string | number; // which Ingredients record has been selected
  loaded: boolean; // has the Ingredients list been loaded
  error?: string | null; // last known error (if any)
}

export interface IngredientsPartialState {
  readonly [INGREDIENTS_FEATURE_KEY]: State;
}

export const ingredientsAdapter: EntityAdapter<IngredientEntity> = createEntityAdapter<IngredientEntity>();

export const initialState: State = ingredientsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const ingredientsReducer = createReducer(
  initialState,
  on(IngredientsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(IngredientsActions.loadIngredientsSuccess, (state, { ingredients }) =>
    ingredientsAdapter.setAll(ingredients, { ...state, loaded: true })
  ),
  on(IngredientsActions.loadIngredientsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return ingredientsReducer(state, action);
}
