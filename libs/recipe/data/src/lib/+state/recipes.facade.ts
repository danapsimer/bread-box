import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as RecipesActions from './recipes.actions';
import * as RecipesFeature from './recipes.reducer';
import * as RecipesSelectors from './recipes.selectors';
import { EditableRecipe, Recipe } from './recipes.models';

@Injectable()
export class RecipesFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(RecipesSelectors.getRecipesLoaded));
  allRecipes$ = this.store.pipe(select(RecipesSelectors.getAllRecipes));
  selectedRecipes$ = this.store.pipe(select(RecipesSelectors.getSelected));


  constructor(private store: Store) {
  }

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(RecipesActions.init());
  }

  /**
   * Make the given recipe id the current recipe.
   *
   * @param recipeId the recipe id to get.
   */
  selectRecipe(recipeId: string) {
    this.store.dispatch(RecipesActions.loadOrSelectRecipe({ recipeId }));
  }

  /**
   * Create a new recipe and make it the selected recipe
   */
  createNewRecipe() {
    this.store.dispatch(RecipesActions.createNewRecipe());
  }

  /**
   * Update the given recipe.
   * @param id the id of the recipe to update.
   * @param updated the updated fields.
   */
  updateRecipe(id: string, updated: EditableRecipe) {
    this.store.dispatch(RecipesActions.updateRecipe({ id, updated }));
  }
}
