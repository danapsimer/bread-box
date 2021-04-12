import { createAction, props } from '@ngrx/store';
import { RecipesEntity } from './recipes.models';

export const init = createAction('[Recipes Page] Init');

export const loadRecipes = createAction('[Recipes Page] Load Recipes');

export const loadOrSelectRecipe = createAction('[Recipes Page] Load Recipe',
  props<{ recipeId: string }>());

export const loadRecipesSuccess = createAction(
  '[Recipes/API] Load Recipes Success',
  props<{ recipes: RecipesEntity[] }>()
);

export const loadRecipesFailure = createAction(
  '[Recipes/API] Load Recipes Failure',
  props<{ error: any }>()
);
