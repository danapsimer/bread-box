import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as UnitFeature from './unit.reducer';
import * as UnitActions from './unit.actions';
import { UnitsService } from '../units.service';
import { map, toArray } from 'rxjs/operators';

@Injectable()
export class UnitEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnitActions.init),
      fetch({
        run: (action) => {
          return this.unitsService.getAll$().pipe(
            toArray(),
            map(units => UnitActions.loadUnitSuccess({ unit: units }))
          );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return UnitActions.loadUnitFailure({ error });
        }
      })
    )
  );

  constructor(private actions$: Actions, private unitsService: UnitsService) {
  }
}
