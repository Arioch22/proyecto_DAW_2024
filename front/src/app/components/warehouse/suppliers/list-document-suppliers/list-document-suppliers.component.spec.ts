import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocumentSuppliersComponent } from './list-document-suppliers.component';

describe('ListDocumentSuppliersComponent', () => {
  let component: ListDocumentSuppliersComponent;
  let fixture: ComponentFixture<ListDocumentSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDocumentSuppliersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDocumentSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
