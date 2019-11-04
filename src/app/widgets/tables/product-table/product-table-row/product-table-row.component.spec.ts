import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableRowComponent } from './product-table-row.component';

describe('ProductRowComponent', () => {
  let component: ProductTableRowComponent;
  let fixture: ComponentFixture<ProductTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
