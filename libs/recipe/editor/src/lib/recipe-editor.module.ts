import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IngredientDataModule } from '@bread-box/ingredient/data';
import { UnitDataModule } from '@bread-box/unit/data';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IngredientDataModule,
    UnitDataModule
  ],
  declarations: [
    RecipeEditorComponent
  ],
  exports: [
    RecipeEditorComponent
  ]
})
export class RecipeEditorModule {}
