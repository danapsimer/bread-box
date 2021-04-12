import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INGREDIENTS_FEATURE_KEY,
  State,
  IngredientsPartialState,
  ingredientsAdapter,
} from './ingredients.reducer';

// Lookup the 'Ingredients' feature state managed by NgRx
export const getIngredientsState = createFeatureSelector<
  IngredientsPartialState,
  State
>(INGREDIENTS_FEATURE_KEY);

const { selectAll, selectEntities } = ingredientsAdapter.getSelectors();

export const getIngredientsLoaded = createSelector(
  getIngredientsState,
  (state: State) => state.loaded
);

export const getIngredientsError = createSelector(
  getIngredientsState,
  (state: State) => state.error
);

export const getAllIngredients = createSelector(
  getIngredientsState,
  (state: State) => selectAll(state)
);

export const getIngredientsEntities = createSelector(
  getIngredientsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getIngredientsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getIngredientsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
