import { UnitEntity } from './unit.models';
import { State, unitAdapter, initialState } from './unit.reducer';
import * as UnitSelectors from './unit.selectors';

describe('Unit Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getUnitId = (it) => it['id'];
  const createUnitEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as UnitEntity);

  let state;

  beforeEach(() => {
    state = {
      unit: unitAdapter.setAll(
        [
          createUnitEntity('PRODUCT-AAA'),
          createUnitEntity('PRODUCT-BBB'),
          createUnitEntity('PRODUCT-CCC'),
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

  describe('Unit Selectors', () => {
    it('getAllUnit() should return the list of Unit', () => {
      const results = UnitSelectors.getAllUnit(state);
      const selId = getUnitId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = UnitSelectors.getSelected(state);
      const selId = getUnitId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getUnitLoaded() should return the current 'loaded' status", () => {
      const result = UnitSelectors.getUnitLoaded(state);

      expect(result).toBe(true);
    });

    it("getUnitError() should return the current 'error' state", () => {
      const result = UnitSelectors.getUnitError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
