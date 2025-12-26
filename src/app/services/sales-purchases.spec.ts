import { TestBed } from '@angular/core/testing';

import { SalesPurchases } from './sales-purchases';

describe('SalesPurchases', () => {
  let service: SalesPurchases;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesPurchases);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
