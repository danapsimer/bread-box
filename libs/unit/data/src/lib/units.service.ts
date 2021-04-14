import { Injectable } from '@angular/core';
import { UnitEntity } from '@bread-box/unit/data';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  dummyUnits: UnitEntity[] = [
    { id: 'g', name: 'gram', plural: 'grams' },
    { id: 'oz.', name: 'ounce', plural: 'ounces' },
    { id: 'fl. oz.', name: 'fluid ounce', plural: 'fluid ounces' },
    { id: 'c', name: 'cup', plural: 'cups' },
    { id: 'l', name: 'liter', plural: 'liters' }
  ];

  constructor() {
  }

  getAll$(): Observable<UnitEntity> {
    return from(this.dummyUnits);
  }
}
