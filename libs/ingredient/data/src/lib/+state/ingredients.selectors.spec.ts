import { IngredientEntity } from './ingredients.models';
import { State, ingredientsAdapter, initialState } from './ingredients.reducer';
import * as IngredientsSelectors from './ingredients.selectors';

describe('Ingredients Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getIngredientsId = (it) => it['id'];
  const createIngredientsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as IngredientEntity);

  let state;

  beforeEach(() => {
    state = {
      ingredients: ingredientsAdapter.setAll(
        [
          createIngredientsEntity('PRODUCT-AAA'),
          createIngredientsEntity('PRODUCT-BBB'),
          createIngredientsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Ingredients Selectors', () => {
    it('getAllIngredients() should return the list of Ingredients', () => {
      const results = IngredientsSelectors.getAllIngredients(state);
      const selId = getIngredientsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = IngredientsSelectors.getSelected(state);
      const selId = getIngredientsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getIngredientsLoaded() should return the current 'loaded' status", () => {
      const result = IngredientsSelectors.getIngredientsLoaded(state);

      expect(result).toBe(true);
    });

    it("getIngredientsError() should return the current 'error' state", () => {
      const result = IngredientsSelectors.getIngredientsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
