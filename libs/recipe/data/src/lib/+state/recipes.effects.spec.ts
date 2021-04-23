import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { RecipesEffects } from './recipes.effects';
import * as RecipesActions from './recipes.actions';
import { RecipesService } from '../recipes.service';
import { Recipe } from '@bread-box/recipe/data';
import { getLoadedIds } from './recipes.selectors';

describe('RecipesEffects', () => {
  let actions: Observable<any>;
  let effects: RecipesEffects;
  let recipesService: RecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        RecipesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore({
          selectors: [
            {
              selector: getLoadedIds,
              value: ['1','2','3']
            }
          ]
        }),
        RecipesService
      ]
    });

    effects = TestBed.inject(RecipesEffects);
    recipesService = TestBed.get(RecipesService);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: RecipesActions.init() });

      const expected = hot('-a-|', {
        a: RecipesActions.loadRecipesSuccess({ recipes: recipesService.dummyRecipes })
      });

      expect(effects.init$).toBeObservable(expected);
    });

  });

  describe('loadOrSelectRecipe$', () => {

    it('should select the recipe if it is already loaded', () => {
      actions = hot('-a-|', {
        a: RecipesActions.loadOrSelectRecipe({ recipeId: '3' })
      });
      const expected = hot('-a-|', {
        a: RecipesActions.selectRecipe({ id: '3' })
      });
      expect(effects.loadOrSelectRecipe$).toBeObservable(expected);
    });

    it('should add and select the recipe if it is not already loaded', () => {
      const testRecipe: Recipe = { id: '4', name: 'Wheat Bread', ingredients: [] };
      recipesService.save(testRecipe);
      actions = hot('-a-', { a: RecipesActions.loadOrSelectRecipe({ recipeId: '4' }) });
      const expected = hot('-(ab)-', {
        a: RecipesActions.addRecipe({ recipe: testRecipe }),
        b: RecipesActions.selectRecipe({ id: '4' })
      });
      expect(effects.loadOrSelectRecipe$).toBeObservable(expected);
    });
  });
});
