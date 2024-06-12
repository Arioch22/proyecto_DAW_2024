import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { existUserGuard } from './exist-user.guard';

describe('existUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => existUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
