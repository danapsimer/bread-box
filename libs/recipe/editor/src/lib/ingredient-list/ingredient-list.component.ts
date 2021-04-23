import { Component, forwardRef, HostBinding, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormArray,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { RecipeIngredient } from '@bread-box/recipe/data';
import { Observable } from 'rxjs';
import { UnitEntity, UnitFacade } from '@bread-box/unit/data';
import { IngredientsFacade } from '@bread-box/ingredient/data';
import { map, mergeMap, tap, toArray } from 'rxjs/operators';

@Component({
  selector: 'bread-box-ingredient-list',
  template: `
    <div [formGroup]='form'>
      <mat-toolbar>
        <h2>Ingredients</h2><span class='ingredient-toolbar-spacer'></span>
        <button mat-icon-button type='button' (click)='addIngredient()'>
          <mat-icon>add</mat-icon>
        </button>
      </mat-toolbar>
      <mat-grid-list cols='1' rowHeight='4em' formArrayName='ingredients'>
        <mat-grid-tile *ngFor='let ingredient of ingredients.controls; let i=index' [formGroupName]='i'>
          <div class='internalMatGrid'>
            <mat-grid-list cols='12' rowHeight='4em' gutterSize='1em'>
              <mat-grid-tile colspan='2'>
                <mat-form-field appearance='standard' class='gridControlWidth'>
                  <mat-label>Quantity</mat-label>
                  <input matInput type='number' formControlName='quantity' />
                </mat-form-field>
              </mat-grid-tile>
              <mat-grid-tile colspan='2'>
                <mat-form-field appearance='standard' class='gridControlWidth'>
                  <mat-label>Unit</mat-label>
                  <mat-select formControlName='unit'>
                    <mat-option *ngFor='let unit of units$ | async'
                                [value]='unit.id'>{{ingredients.at(i).get('quantity').value > 1 ? unit.plural : unit.name}}</mat-option>
                  </mat-select>
                </mat-form-field>
              </mat-grid-tile>
              <mat-grid-tile colspan='7'>
                <mat-form-field appearance='standard' class='gridControlWidth'>
                  <mat-label>Ingredient</mat-label>
                  <mat-select formControlName='ingredientId'>
                    <mat-option *ngFor='let availIngredient of availableIngredients$ | async'
                                [value]='availIngredient.id'>
                      {{availIngredient.name}}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
              </mat-grid-tile>
              <mat-grid-tile colspan='1'>
                <button mat-icon-button type='button' (click)='deleteIngredient(i)'>
                  <mat-icon>delete</mat-icon>
                </button>
              </mat-grid-tile>
            </mat-grid-list>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styleUrls: ['./ingredient-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IngredientListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IngredientListComponent),
      multi: true
    }
  ]
})
export class IngredientListComponent implements OnInit, ControlValueAccessor, Validator {

  constructor(
    private fb: FormBuilder,
    private ingredientsFacade: IngredientsFacade,
    private unitFacade: UnitFacade
  ) {
  }

  form = this.fb.group({
    ingredients: this.fb.array([], Validators.minLength(1))
  });


  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method,@typescript-eslint/no-empty-function
  ngOnInit(): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {
  };

  registerOnChange(fn: any): void {
    this.form.valueChanges
      .pipe(
        map(v => v['ingredients']),
      )
      .subscribe(fn);
  }

  /* ControlValueAccessor Methods */

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(val: RecipeIngredient[]): void {
    if (val) {
      this.ingredients.clear();
      val.forEach(this.addIngredient);
    }
  }

  /* Validator Methods */

  validate(c: AbstractControl): ValidationErrors | null {
    return null; //this.form.validator(c);
  }

  /* Accessors */
  get units$(): Observable<UnitEntity[]> {
    return this.unitFacade.allUnit$;
  }

  get availableIngredients$() {
    return this.ingredientsFacade.allIngredients$;
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  /* Mutations */

  addIngredient(ingredient?: RecipeIngredient) {
    if (!ingredient) {
      ingredient = {
        ingredientId: '',
        quantity: 0,
        unit: 'g'
      };
    }
    this.ingredients.push(this.fb.group({
      ingredientId: [ingredient.ingredientId, Validators.required],
      quantity: [ingredient.quantity, Validators.min(0.001)],
      unit: [ingredient.unit, Validators.required]
    }));
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

}
