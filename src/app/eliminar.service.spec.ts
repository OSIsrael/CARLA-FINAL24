import { TestBed } from '@angular/core/testing';

import { EliminarService } from './eliminar.service';

describe('EliminarService', () => {
  let service: EliminarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EliminarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
