import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as RecipesFeature from './recipes.reducer';
import * as RecipesActions from './recipes.actions';

@Injectable()
export class RecipesEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return RecipesActions.loadRecipesSuccess({ recipes: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return RecipesActions.loadRecipesFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
