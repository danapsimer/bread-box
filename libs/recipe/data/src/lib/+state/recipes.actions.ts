import { createAction, props } from '@ngrx/store';
import { EditableRecipe, Recipe, RecipeIngredient } from './recipes.models';

export const init = createAction('[Recipes Page] Init');

export const loadRecipes = createAction('[Recipes Page] Load Recipes');

export const loadOrSelectRecipe = createAction('[Recipes Page] Load Recipe',
  props<{ recipeId: string }>());

export const loadRecipesSuccess = createAction(
  '[Recipes/API] Load Recipes Success',
  props<{ recipes: Recipe[] }>()
);

export const loadRecipesFailure = createAction(
  '[Recipes/API] Load Recipes Failure',
  props<{ error: any }>()
);

export const addRecipe = createAction(
  '[Recipes/API] Add Recipe',
  props<{recipe:Recipe}>()
);

export const selectRecipe = createAction(
  '[Recipes/API] Select Recipe',
  props<{id:string}>()
);

export const createNewRecipe = createAction(
  '[Recipes/API] Create New Recipe'
);

export const updateRecipe = createAction(
  '[Recipes/API] Update Recipe',
  props<{ id: string, updated: EditableRecipe }>()
);

export const addRecipeIngredient = createAction(
  '[Recipes/API] Add Recipe Ingredient',
  props<{ ingredient: RecipeIngredient }>()
);

export const updateRecipeIngredient = createAction(
  '[Recipes/API] Update Recipe Ingredient',
  props<{ idx: number, ingredient: RecipeIngredient }>()
);

export const removeRecipeIngredient = createAction(
  '[Recipes/API] Remove Recipe Ingredient',
  props<{ idx: number }>()
);
