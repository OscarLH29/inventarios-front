import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitProductComponent } from './exit-product.component';

describe('ExitProductComponent', () => {
  let component: ExitProductComponent;
  let fixture: ComponentFixture<ExitProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
