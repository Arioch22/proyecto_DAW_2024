import { TestBed } from '@angular/core/testing';

import { ResponseApiLoginService } from './response-api-login.service';

describe('ResponseApiLoginService', () => {
  let service: ResponseApiLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseApiLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
