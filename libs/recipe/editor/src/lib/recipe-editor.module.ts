import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';
import { RecipeDataModule } from '@bread-box/recipe/data';
import { IngredientDataModule } from '@bread-box/ingredient/data';

@NgModule({
  imports: [
    CommonModule,
    RecipeDataModule,
    IngredientDataModule
  ],
  declarations: [
    RecipeEditorComponent
  ],
  exports: [
    RecipeEditorComponent
  ]
})
export class RecipeEditorModule {}
