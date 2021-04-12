import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as IngredientsActions from './ingredients.actions';
import * as IngredientsFeature from './ingredients.reducer';
import * as IngredientsSelectors from './ingredients.selectors';
import { first, map } from 'rxjs/operators';
import { IngredientEntity } from './ingredients.models';
import { Observable } from 'rxjs';

@Injectable()
export class IngredientsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(IngredientsSelectors.getIngredientsLoaded));
  allIngredients$ = this.store.pipe(
    select(IngredientsSelectors.getAllIngredients)
  );
  selectedIngredients$ = this.store.pipe(
    select(IngredientsSelectors.getSelected)
  );
  ingredientById$(id:string) : Observable<IngredientEntity> {
    return this.store.pipe(
      select(IngredientsSelectors.getIngredientsEntities),
      map((ingredients) => ingredients[id]),
      first()
    );
  }

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(IngredientsActions.init());
  }
}
