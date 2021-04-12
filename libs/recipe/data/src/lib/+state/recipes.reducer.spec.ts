import { RecipesEntity } from './recipes.models';
import * as RecipesActions from './recipes.actions';
import { State, initialState, reducer } from './recipes.reducer';

describe('Recipes Reducer', () => {
  const createRecipesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RecipesEntity);

  beforeEach(() => {});

  describe('valid Recipes actions', () => {
    it('loadRecipesSuccess should return set the list of known Recipes', () => {
      const recipes = [
        createRecipesEntity('PRODUCT-AAA'),
        createRecipesEntity('PRODUCT-zzz'),
      ];
      const action = RecipesActions.loadRecipesSuccess({ recipes });

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
