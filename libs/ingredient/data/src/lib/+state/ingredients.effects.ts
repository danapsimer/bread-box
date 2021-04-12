import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as IngredientsFeature from './ingredients.reducer';
import * as IngredientsActions from './ingredients.actions';
import { IngredientsService } from '../ingredients.service';
import { map, toArray } from 'rxjs/operators';

@Injectable()
export class IngredientsEffects {

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientsActions.init),
      fetch({
        run: (action) => {
          return this.ingredientsService.getAll$().pipe(
            toArray(),
            map((ingredients) => IngredientsActions.loadIngredientsSuccess({ ingredients: ingredients }))
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return IngredientsActions.loadIngredientsFailure({ error });
        }
      })
    )
  );

  constructor(private ingredientsService: IngredientsService, private actions$: Actions) {
  }
}
