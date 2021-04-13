import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as RecipesFeature from './recipes.reducer';
import * as RecipesActions from './recipes.actions';
import { RecipesService } from '../recipes.service';
import { map, toArray } from 'rxjs/operators';

@Injectable()
export class RecipesEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.init),
      fetch({
        run: (action) => {
          return this.recipeService.getAll$().pipe(
            toArray(),
            map(recipes => RecipesActions.loadRecipesSuccess({ recipes }))
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RecipesActions.loadRecipesFailure({ error });
        }
      })
    )
  );

  constructor(private actions$: Actions, private recipeService: RecipesService) {
  }
}
