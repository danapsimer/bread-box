import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { RecipesEffects } from './recipes.effects';
import * as RecipesActions from './recipes.actions';
import { RecipesService } from '../recipes.service';

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
        provideMockStore(),
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
});
