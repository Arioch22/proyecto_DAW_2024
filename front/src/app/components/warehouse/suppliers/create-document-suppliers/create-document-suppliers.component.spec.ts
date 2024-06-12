import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentSuppliersComponent } from './create-document-suppliers.component';

describe('CreateDocumentSuppliersComponent', () => {
  let component: CreateDocumentSuppliersComponent;
  let fixture: ComponentFixture<CreateDocumentSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDocumentSuppliersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDocumentSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
