import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromIngredients from './+state/ingredients.reducer';
import { IngredientsEffects } from './+state/ingredients.effects';
import { IngredientsFacade } from './+state/ingredients.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromIngredients.INGREDIENTS_FEATURE_KEY,
      fromIngredients.reducer
    ),
    EffectsModule.forFeature([IngredientsEffects]),
  ],
  providers: [IngredientsFacade],
})
export class IngredientDataModule {}
