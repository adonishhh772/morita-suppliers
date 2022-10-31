import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBillingComponent } from './checkout-billing.component';

describe('CheckoutBillingComponent', () => {
  let component: CheckoutBillingComponent;
  let fixture: ComponentFixture<CheckoutBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
