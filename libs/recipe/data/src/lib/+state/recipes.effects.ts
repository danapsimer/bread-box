import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as RecipesFeature from './recipes.reducer';
import * as RecipesActions from './recipes.actions';
import { RecipesService } from '../recipes.service';
import { catchError, count, filter, map, mergeMap, take, tap, toArray } from 'rxjs/operators';
import { RecipesFacade } from './recipes.facade';
import { getById, getLoadedIds, getSelected } from './recipes.selectors';
import { select, Store } from '@ngrx/store';
import { Recipe } from '@bread-box/recipe/data';
import { from, iif, of, race } from 'rxjs';

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

  loadOrSelectRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.loadOrSelectRecipe),
      mergeMap(({ recipeId }) => {
          return this.store.pipe(
            select(getLoadedIds),
            take(1),
            mergeMap(from),
            count(v => v == recipeId),
            map(c => ({ recipeId, loaded: c > 0 }))
          );
        }
      ),
      mergeMap(({ recipeId, loaded }) => {
        return iif(
          () => loaded,
          of(RecipesActions.selectRecipe({ id: recipeId })),
          this.recipeService.getById$(recipeId).pipe(
            mergeMap(recipe => of(
              RecipesActions.addRecipe({ recipe }),
              RecipesActions.selectRecipe({ id: recipe.id })
              )
            )
          )
        )
      }
      ),
    )
  );

  constructor(private actions$: Actions, private recipeService: RecipesService, private store: Store) {
  }
}
