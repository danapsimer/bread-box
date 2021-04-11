import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    RecipeEditorComponent
  ],
  exports: [
    RecipeEditorComponent
  ]
})
export class RecipeEditorModule {}
