import { TestBed } from '@angular/core/testing';

import { RecipesService } from './recipes.service';
import { toArray } from 'rxjs/operators';

describe('RecipesService', () => {
  let service: RecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return dummy data from getAll', () => {
    return service.getAll$().pipe(toArray()).toPromise().then(value => {
      expect(value.length).toBe(1);
    });
  })

  it('should return dummy data from getAll', () => {
    return service.getAll$().pipe(toArray()).toPromise().then(value => {
      expect(value.length).toBe(1);
    });
  })
});
