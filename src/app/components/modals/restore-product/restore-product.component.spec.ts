import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreProductComponent } from './restore-product.component';

describe('RestoreProductComponent', () => {
  let component: RestoreProductComponent;
  let fixture: ComponentFixture<RestoreProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoreProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
