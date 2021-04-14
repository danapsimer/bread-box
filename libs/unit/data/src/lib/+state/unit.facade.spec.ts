import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { UnitEntity } from './unit.models';
import { UnitEffects } from './unit.effects';
import { UnitFacade } from './unit.facade';

import * as UnitSelectors from './unit.selectors';
import * as UnitActions from './unit.actions';
import { UNIT_FEATURE_KEY, State, initialState, reducer } from './unit.reducer';

interface TestSchema {
  unit: State;
}

describe('UnitFacade', () => {
  let facade: UnitFacade;
  let store: Store<TestSchema>;
  const createUnitEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as UnitEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(UNIT_FEATURE_KEY, reducer),
          EffectsModule.forFeature([UnitEffects]),
        ],
        providers: [UnitFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(UnitFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allUnit$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allUnit$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadUnitSuccess` to manually update list
     */
    it('allUnit$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allUnit$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          UnitActions.loadUnitSuccess({
            unit: [createUnitEntity('AAA'), createUnitEntity('BBB')],
          })
        );

        list = await readFirst(facade.allUnit$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
