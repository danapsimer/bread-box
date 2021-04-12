import { IngredientEntity } from './ingredients.models';
import * as IngredientsActions from './ingredients.actions';
import { State, initialState, reducer } from './ingredients.reducer';

describe('Ingredients Reducer', () => {
  const createIngredientsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as IngredientEntity);

  beforeEach(() => {});

  describe('valid Ingredients actions', () => {
    it('loadIngredientsSuccess should return set the list of known Ingredients', () => {
      const ingredients = [
        createIngredientsEntity('PRODUCT-AAA'),
        createIngredientsEntity('PRODUCT-zzz'),
      ];
      const action = IngredientsActions.loadIngredientsSuccess({ ingredients });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
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
