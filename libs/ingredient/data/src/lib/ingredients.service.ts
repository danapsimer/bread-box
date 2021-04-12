import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { IngredientEntity } from './+state/ingredients.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor() {
  }

  dummyIngredients: IngredientEntity[] = [
    { id: '1', name: 'Bread Flour', isGrain: true } as IngredientEntity,
    { id: '2', name: 'Water', isGrain: false } as IngredientEntity,
    { id: '3', name: 'Yeast', isGrain: false } as IngredientEntity,
    { id: '4', name: 'Milk', isGrain: false } as IngredientEntity,
    { id: '5', name: 'Sugar', isGrain: false } as IngredientEntity,
    { id: '6', name: 'Salt', isGrain: false } as IngredientEntity
  ];

  getAll$(): Observable<IngredientEntity> {
    return from(this.dummyIngredients);
  }
}
