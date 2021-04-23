import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { IngredientsFacade } from '@bread-box/ingredient/data';
import { UnitEntity, UnitFacade } from '@bread-box/unit/data';
import { Observable } from 'rxjs';
import { RecipesFacade } from '@bread-box/recipe/data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bread-box-recipe-editor',
  template: `
    <form [formGroup]='form' (ngSubmit)='onSubmit'>
      <mat-form-field appearance='standard'>
        <mat-label>Name</mat-label>
        <input matInput placeholder='Name' formControlName='name' />
      </mat-form-field>
      <p></p>
      <bread-box-ingredient-list formControlName='ingredients'></bread-box-ingredient-list>
      <button mat-icon-button type='submit' [disabled]='!form.valid'>
        <mat-icon>save</mat-icon>
      </button>
      <p></p>
      <mat-divider></mat-divider>
      <p></p>
      <p>
        {{ form.value | json }}
      </p>
      <p>
        Form Status: {{ form.status }}
      </p>
    </form>
  `,
  styleUrls: ['./recipe-editor.component.css']
})
export class RecipeEditorComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private ingredientsFacade: IngredientsFacade,
              private recipesFacade: RecipesFacade,
              private unitFacade: UnitFacade,
              private route: ActivatedRoute) {
  }

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.control([]),
  });

  ngOnInit(): void {
    this.ingredientsFacade.init();
    this.unitFacade.init();
    this.recipesFacade.init();

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.recipesFacade.selectRecipe(params['id']);
      } else {
        this.recipesFacade.createNewRecipe();
      }
    });
  }


  onSubmit() {
  }
}
