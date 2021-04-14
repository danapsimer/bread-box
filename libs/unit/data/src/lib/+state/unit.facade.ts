import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as UnitActions from './unit.actions';
import * as UnitFeature from './unit.reducer';
import * as UnitSelectors from './unit.selectors';

@Injectable()
export class UnitFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(UnitSelectors.getUnitLoaded));
  allUnit$ = this.store.pipe(select(UnitSelectors.getAllUnit));
  selectedUnit$ = this.store.pipe(select(UnitSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(UnitActions.init());
  }
}
