import { Injectable } from '@angular/core';
import { Recipe } from '@bread-box/recipe/data';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor() {
  }

  dummyRecipes: Recipe[] = [
    {
      id: '1',
      name: 'White Bread',
      ingredients: [
        { ingredientId: '1', quantity: 750, unit: 'g' },
        { ingredientId: '2', quantity: 200, unit: 'g' },
        { ingredientId: '3', quantity: 10, unit: 'g' },
        { ingredientId: '4', quantity: 100, unit: 'g' },
        { ingredientId: '5', quantity: 100, unit: 'g' },
        { ingredientId: '6', quantity: 15, unit: 'g' }
      ]
    }
  ];

  getAll$(): Observable<Recipe> {
    return from(this.dummyRecipes)
  }
}
