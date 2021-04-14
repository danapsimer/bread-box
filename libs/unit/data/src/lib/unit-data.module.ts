import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUnit from './+state/unit.reducer';
import { UnitEffects } from './+state/unit.effects';
import { UnitFacade } from './+state/unit.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUnit.UNIT_FEATURE_KEY, fromUnit.reducer),
    EffectsModule.forFeature([UnitEffects]),
  ],
  providers: [UnitFacade],
})
export class UnitDataModule {}
