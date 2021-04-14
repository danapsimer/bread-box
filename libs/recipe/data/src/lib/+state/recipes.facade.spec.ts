import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { Recipe } from './recipes.models';
import { RecipesEffects } from './recipes.effects';
import { RecipesFacade } from './recipes.facade';

import * as RecipesSelectors from './recipes.selectors';
import * as RecipesActions from './recipes.actions';
import {
  RECIPES_FEATURE_KEY,
  State,
  initialState,
  reducer
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
      name: name || `name-${id}`
    } as Recipe);

  beforeEach(() => {
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(RECIPES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([RecipesEffects])
        ],
        providers: [RecipesFacade]
      })
      class CustomFeatureModule {
      }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {
      }

      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(RecipesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('init() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allRecipes$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allRecipes$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(1);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('createNewRecipe should create a new recipe with a null name and empty ingredients', async (done) => {
      try {
        let list = await readFirst(facade.allRecipes$);
        expect(list.length).toBe(0);

        facade.createNewRecipe();

        list = await readFirst(facade.allRecipes$);

        expect(list.length).toBe(1);
        expect(list[0]).toStrictEqual({ id: list[0].id, ingredients: [], name: null });

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('updateRecipe should update a recipe with a name', async (done) => {
      try {
        let list = await readFirst(facade.allRecipes$);
        expect(list.length).toBe(0);

        facade.createNewRecipe();

        list = await readFirst(facade.allRecipes$);

        expect(list.length).toBe(1);

        facade.updateRecipe(list[0].id, { name: 'White Bread' });

        list = await readFirst(facade.allRecipes$);

        expect(list.length).toBe(1);
        expect(list[0]).toStrictEqual({ id: list[0].id, ingredients: [], name: 'White Bread' });

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
            recipes: [createRecipesEntity('AAA'), createRecipesEntity('BBB')]
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
