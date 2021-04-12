import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  RECIPES_FEATURE_KEY,
  State,
  RecipesPartialState,
  recipesAdapter,
} from './recipes.reducer';

// Lookup the 'Recipes' feature state managed by NgRx
export const getRecipesState = createFeatureSelector<
  RecipesPartialState,
  State
>(RECIPES_FEATURE_KEY);

const { selectAll, selectEntities } = recipesAdapter.getSelectors();

export const getRecipesLoaded = createSelector(
  getRecipesState,
  (state: State) => state.loaded
);

export const getRecipesError = createSelector(
  getRecipesState,
  (state: State) => state.error
);

export const getAllRecipes = createSelector(getRecipesState, (state: State) =>
  selectAll(state)
);

export const getRecipesEntities = createSelector(
  getRecipesState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getRecipesState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getRecipesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
