import { TestBed } from '@angular/core/testing';

import { RolIdService } from './rol-id.service';

describe('RolIdService', () => {
  let service: RolIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
