import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryFormCreateComponent } from './delivery-form-create.component';

describe('DeliveryFormCreateComponent', () => {
  let component: DeliveryFormCreateComponent;
  let fixture: ComponentFixture<DeliveryFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryFormCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
