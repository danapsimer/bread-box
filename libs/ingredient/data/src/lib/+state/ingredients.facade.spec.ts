import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { IngredientEntity } from './ingredients.models';
import { IngredientsEffects } from './ingredients.effects';
import { IngredientsFacade } from './ingredients.facade';

import * as IngredientsSelectors from './ingredients.selectors';
import * as IngredientsActions from './ingredients.actions';
import {
  INGREDIENTS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './ingredients.reducer';

interface TestSchema {
  ingredients: State;
}

describe('IngredientsFacade', () => {
  let facade: IngredientsFacade;
  let store: Store<TestSchema>;
  const createIngredientsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as IngredientEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(INGREDIENTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([IngredientsEffects]),
        ],
        providers: [IngredientsFacade],
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
      facade = TestBed.inject(IngredientsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allIngredients$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allIngredients$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(6);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadIngredientsSuccess` to manually update list
     */
    it('allIngredients$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allIngredients$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          IngredientsActions.loadIngredientsSuccess({
            ingredients: [
              createIngredientsEntity('AAA'),
              createIngredientsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allIngredients$);
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
