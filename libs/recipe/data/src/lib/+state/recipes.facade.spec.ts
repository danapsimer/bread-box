import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { RecipesEntity } from './recipes.models';
import { RecipesEffects } from './recipes.effects';
import { RecipesFacade } from './recipes.facade';

import * as RecipesSelectors from './recipes.selectors';
import * as RecipesActions from './recipes.actions';
import {
  RECIPES_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './recipes.reducer';

interface TestSchema {
  recipes: State;
}

describe('RecipesFacade', () => {
  let facade: RecipesFacade;
  let store: Store<TestSchema>;
  const createRecipesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RecipesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(RECIPES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([RecipesEffects]),
        ],
        providers: [RecipesFacade],
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
      facade = TestBed.inject(RecipesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allRecipes$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allRecipes$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadRecipesSuccess` to manually update list
     */
    it('allRecipes$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allRecipes$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          RecipesActions.loadRecipesSuccess({
            recipes: [createRecipesEntity('AAA'), createRecipesEntity('BBB')],
          })
        );

        list = await readFirst(facade.allRecipes$);
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
