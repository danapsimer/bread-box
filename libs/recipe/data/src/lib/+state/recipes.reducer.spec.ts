import { RecipeIngredient, Recipe } from './recipes.models';
import * as RecipesActions from './recipes.actions';
import { State, initialState, reducer } from './recipes.reducer';
import { createNewRecipe } from './recipes.actions';

describe('Recipes Reducer', () => {
  const createRecipesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as Recipe);

  beforeEach(() => {
  });

  describe('valid Recipes actions', () => {
    it('loadRecipesSuccess should return set the list of known Recipes', () => {
      const recipes = [
        createRecipesEntity('PRODUCT-AAA'),
        createRecipesEntity('PRODUCT-zzz')
      ];
      const action = RecipesActions.loadRecipesSuccess({ recipes });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
    it('createNewRecipe should add a new recipe to the list of known Recipes', () => {
      const action = RecipesActions.createNewRecipe();
      const result: State = reducer(initialState, action);
      expect(result.loaded).toBe(false);
      expect(result.ids.length).toBe(1);
    });
    it('updateRecipe should update the recipe with the values passed in', () => {
      const createAction = RecipesActions.createNewRecipe();
      let inputState: State = reducer(initialState, createAction);
      const ingredient1: RecipeIngredient = {
        ingredientId: '1',
        quantity: 5,
        unit: 'g'
      };
      inputState = reducer(inputState, RecipesActions.addRecipeIngredient({ ingredient: ingredient1 }));
      const action = RecipesActions.updateRecipe({ id: inputState.selectedId, updated: { name: 'White Bread' } });
      const finalState = reducer(inputState, action);
      const recipe = finalState.entities[finalState.selectedId];
      expect(recipe.name).toBe('White Bread');
      expect(recipe.ingredients.length).toBe(1);
    });
    it('addRecipeIngredient should add an ingredient to the selected Recipe', () => {
      const createAction = RecipesActions.createNewRecipe();
      const afterCreate: State = reducer(initialState, createAction);
      const ingredient: RecipeIngredient = {
        ingredientId: '1',
        quantity: 5,
        unit: 'g'
      };
      const action = RecipesActions.addRecipeIngredient({ ingredient });
      const result: State = reducer(afterCreate, action);
      const recipeIngredients = result.entities[result.selectedId].ingredients;
      expect(recipeIngredients.length).toBe(1);
      expect(recipeIngredients[0]).toBe(ingredient);
    });
    it('updateRecipeIngredient should update an ingredient in the selected Recipe', () => {
      const createAction = RecipesActions.createNewRecipe();
      let inputState: State = reducer(initialState, createAction);
      const ingredient1: RecipeIngredient = {
        ingredientId: '1',
        quantity: 5,
        unit: 'g'
      };
      const ingredient2: RecipeIngredient = {
        ingredientId: '2',
        quantity: 1,
        unit: 'g'
      };
      inputState = reducer(inputState, RecipesActions.addRecipeIngredient({ ingredient: ingredient1 }));
      inputState = reducer(inputState, RecipesActions.addRecipeIngredient({ ingredient: ingredient2 }));

      const finalState = reducer(inputState, RecipesActions.updateRecipeIngredient({
        idx: 0, ingredient: {
          ...ingredient1,
          quantity: 750
        }
      }));

      const recipeIngredients = finalState.entities[finalState.selectedId].ingredients;
      expect(recipeIngredients.length).toBe(2);
      expect(recipeIngredients[0].quantity).toBe(750);
      expect(recipeIngredients[1].quantity).toBe(1);
    });
    it('removeRecipeIngredient should remove an ingredient in the selected Recipe', () => {
      const createAction = RecipesActions.createNewRecipe();
      let inputState: State = reducer(initialState, createAction);
      const ingredient1: RecipeIngredient = {
        ingredientId: '1',
        quantity: 5,
        unit: 'g'
      };
      const ingredient2: RecipeIngredient = {
        ingredientId: '2',
        quantity: 1,
        unit: 'g'
      };
      inputState = reducer(inputState, RecipesActions.addRecipeIngredient({ ingredient: ingredient1 }));
      inputState = reducer(inputState, RecipesActions.addRecipeIngredient({ ingredient: ingredient2 }));

      const finalState = reducer(inputState, RecipesActions.removeRecipeIngredient({ idx: 0 }));

      const recipeIngredients = finalState.entities[finalState.selectedId].ingredients;
      expect(recipeIngredients.length).toBe(1);
      expect(recipeIngredients[0]).toBe(ingredient2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
