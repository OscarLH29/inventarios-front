import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoriesPageComponent } from './inventories-page.component';

describe('InventoriesPageComponent', () => {
  let component: InventoriesPageComponent;
  let fixture: ComponentFixture<InventoriesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoriesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
