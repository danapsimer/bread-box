import { createAction, props } from '@ngrx/store';
import { IngredientEntity } from './ingredients.models';

export const init = createAction('[Ingredients Page] Init');

export const loadIngredientsSuccess = createAction(
  '[Ingredients/API] Load Ingredients Success',
  props<{ ingredients: IngredientEntity[] }>()
);

export const loadIngredientsFailure = createAction(
  '[Ingredients/API] Load Ingredients Failure',
  props<{ error: any }>()
);
