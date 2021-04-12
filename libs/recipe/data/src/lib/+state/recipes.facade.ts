import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as RecipesActions from './recipes.actions';
import * as RecipesFeature from './recipes.reducer';
import * as RecipesSelectors from './recipes.selectors';

@Injectable()
export class RecipesFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(RecipesSelectors.getRecipesLoaded));
  allRecipes$ = this.store.pipe(select(RecipesSelectors.getAllRecipes));
  selectedRecipes$ = this.store.pipe(select(RecipesSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(RecipesActions.init());
  }
}
