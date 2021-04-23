import { Injectable } from '@angular/core';
import { Recipe } from '@bread-box/recipe/data';
import { from, Observable, of } from 'rxjs';
import { defaultIfEmpty, filter, first, map, take, tap } from 'rxjs/operators';

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
    return from(this.dummyRecipes);
  }

  getById$(id: string): Observable<Recipe> {
    return from(this.dummyRecipes).pipe(
      first(r => r.id == id)
    );
  }

  save(recipe: Recipe): Observable<Recipe> {
    from(this.dummyRecipes).pipe(
      filter((r) => r.id == recipe.id),
      take(1),
      map((r, i) => i),
      defaultIfEmpty(this.dummyRecipes.length),
  ).subscribe({
      next: idx => {
        this.dummyRecipes[idx] = recipe
      }
    });
    return of(recipe);
  }

  delete(id: string) {
    from(this.dummyRecipes).pipe(
      filter((r) => r.id == id),
      take(1),
      map((r, i) => i),
      defaultIfEmpty(this.dummyRecipes.length)
    ).subscribe({
      next: idx => this.dummyRecipes = this.dummyRecipes.slice(0, idx).concat(this.dummyRecipes.slice(idx + 1))
    });
  }
}
