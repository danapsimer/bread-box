import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { IngredientsFacade } from '@bread-box/ingredient/data';
import { UnitEntity, UnitFacade } from '@bread-box/unit/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'bread-box-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css']
})
export class RecipeEditorComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private ingredientsFacade: IngredientsFacade,
              private unitFacade: UnitFacade) {
  }

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([], Validators.minLength(1))
  });

  ngOnInit(): void {
    this.ingredientsFacade.init();
    this.unitFacade.init();
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get units$(): Observable<UnitEntity[]> {
    return this.unitFacade.allUnit$;
  }

  get availableIngredients$() {
    return this.ingredientsFacade.allIngredients$;
  }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      ingredientId: ['', Validators.required],
      quantity: [0, Validators.min(0.001)],
      unit: ['g', Validators.required]
    }));
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {

  }
}
