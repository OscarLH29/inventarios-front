import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosRepPageComponent } from './movimientos-rep-page.component';

describe('MovimientosRepPageComponent', () => {
  let component: MovimientosRepPageComponent;
  let fixture: ComponentFixture<MovimientosRepPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientosRepPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosRepPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
