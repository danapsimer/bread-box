import { TestBed } from '@angular/core/testing';

import { IngredientsService } from './ingredients.service';
import { toArray } from 'rxjs/operators';

describe('IngredientsService', () => {
  let service: IngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return dummy data from getAll', () => {
    return service.getAll$().pipe(toArray()).toPromise().then(value => {
      expect(value.length).toBe(6);
    });
  });
});
