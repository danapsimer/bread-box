import { TestBed, async } from '@angular/core/testing';

import { from, Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { IngredientsEffects } from './ingredients.effects';
import * as IngredientsActions from './ingredients.actions';
import { IngredientsService } from '../ingredients.service';

describe('IngredientsEffects', () => {
  let actions: Observable<any>;
  let effects: IngredientsEffects;
  let ingredientsService: IngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        IngredientsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        IngredientsService
      ]
    });

    effects = TestBed.inject(IngredientsEffects);
    ingredientsService = TestBed.get(IngredientsService);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: IngredientsActions.init() });

      const expected = hot('-a-|', {
        a: IngredientsActions.loadIngredientsSuccess({ ingredients: ingredientsService.dummyIngredients })
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
