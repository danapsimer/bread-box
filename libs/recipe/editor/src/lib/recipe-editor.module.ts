import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IngredientDataModule } from '@bread-box/ingredient/data';
import { UnitDataModule } from '@bread-box/unit/data';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { RecipesFacade } from '@bread-box/recipe/data';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IngredientDataModule,
    UnitDataModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule
  ],
  declarations: [
    RecipeEditorComponent,
    IngredientListComponent
  ],
  exports: [
    RecipeEditorComponent
  ],
  providers: [
    RecipesFacade
  ]
})
export class RecipeEditorModule {}
