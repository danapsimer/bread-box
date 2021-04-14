import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { UnitEffects } from './unit.effects';
import * as UnitActions from './unit.actions';

describe('UnitEffects', () => {
  let actions: Observable<any>;
  let effects: UnitEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        UnitEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(UnitEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UnitActions.init() });

      const expected = hot('-a-|', {
        a: UnitActions.loadUnitSuccess({ unit: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
