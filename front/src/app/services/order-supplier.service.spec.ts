import { TestBed } from '@angular/core/testing';

import { OrderSupplierService } from './order-supplier.service';

describe('OrderSupplierService', () => {
  let service: OrderSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
