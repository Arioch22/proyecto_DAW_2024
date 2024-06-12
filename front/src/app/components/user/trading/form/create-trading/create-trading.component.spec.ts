import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTradingComponent } from './create-trading.component';

describe('CreateTradingComponent', () => {
  let component: CreateTradingComponent;
  let fixture: ComponentFixture<CreateTradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTradingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
