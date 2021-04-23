import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as RecipesActions from './recipes.actions';
import { Recipe } from './recipes.models';

export const RECIPES_FEATURE_KEY = 'recipes';

export interface State extends EntityState<Recipe> {
  selectedId?: string; // which Recipes record has been selected
  loaded: boolean; // has the Recipes list been loaded
  error?: string | null; // last known error (if any)
}

export interface RecipesPartialState {
  readonly [RECIPES_FEATURE_KEY]: State;
}

export const recipesAdapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>();

export const initialState: State = recipesAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

export function uuidv4(): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    // tslint:disable-next-line:no-bitwise
    (c ^ Math.random() & 15 >> c / 4).toString(16)
  );
}

const recipesReducer = createReducer(
  initialState,
  on(RecipesActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(RecipesActions.loadRecipesSuccess, (state, { recipes }) =>
    recipesAdapter.setAll(recipes, { ...state, loaded: true })
  ),
  on(RecipesActions.loadRecipesFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(RecipesActions.addRecipe, (state, { recipe }) => recipesAdapter.addOne(recipe, state)),
  on(RecipesActions.selectRecipe, (state, { id }) => ({ ...state, selectedId: id })),
  on(RecipesActions.createNewRecipe, (state) => {
    const selectedId = uuidv4();
    return recipesAdapter.addOne({ id: selectedId, name: null, ingredients: [] }, { ...state, selectedId });
  }),
  on(RecipesActions.updateRecipe, (state, { id, updated }) => {
    const recipe = state.entities[id];
    return recipesAdapter.setOne({
        ...recipe,
        ...updated
      },
      state);
  }),
  on(RecipesActions.addRecipeIngredient, (state, { ingredient }) => {
    const selected = state.entities[state.selectedId];
    return recipesAdapter.setOne({
        ...selected,
        ingredients: selected.ingredients.concat([ingredient])
      },
      state);
  }),
  on(RecipesActions.updateRecipeIngredient, (state, { idx, ingredient }) => {
    const selected = state.entities[state.selectedId];
    return recipesAdapter.setOne({
        ...selected,
        ingredients: selected.ingredients.slice(0, idx).concat([ingredient], selected.ingredients.slice(idx + 1))
      },
      state);
  }),
  on(RecipesActions.removeRecipeIngredient, (state, { idx }) => {
    const selected = state.entities[state.selectedId];
    return recipesAdapter.setOne({
        ...selected,
        ingredients: selected.ingredients.slice(0, idx).concat(selected.ingredients.slice(idx + 1))
      },
      state);
  })
);

export function reducer(state: State | undefined, action: Action) {
  return recipesReducer(state, action);
}
