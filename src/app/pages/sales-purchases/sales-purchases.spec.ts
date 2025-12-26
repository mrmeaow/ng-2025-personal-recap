import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPurchases } from './sales-purchases';

describe('SalesPurchases', () => {
  let component: SalesPurchases;
  let fixture: ComponentFixture<SalesPurchases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesPurchases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesPurchases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
