import { UnitEntity } from './unit.models';
import * as UnitActions from './unit.actions';
import { State, initialState, reducer } from './unit.reducer';

describe('Unit Reducer', () => {
  const createUnitEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as UnitEntity);

  beforeEach(() => {});

  describe('valid Unit actions', () => {
    it('loadUnitSuccess should return set the list of known Unit', () => {
      const unit = [
        createUnitEntity('PRODUCT-AAA'),
        createUnitEntity('PRODUCT-zzz'),
      ];
      const action = UnitActions.loadUnitSuccess({ unit });

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
