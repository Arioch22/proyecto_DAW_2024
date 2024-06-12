import { TestBed } from '@angular/core/testing';

import { ExistService } from './exist.service';

describe('ExistService', () => {
  let service: ExistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
