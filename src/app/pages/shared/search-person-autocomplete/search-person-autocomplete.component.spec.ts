import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonAutocompleteComponent } from './search-person-autocomplete.component';

describe('SearchPersonAutocompleteComponent', () => {
  let component: SearchPersonAutocompleteComponent;
  let fixture: ComponentFixture<SearchPersonAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPersonAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPersonAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
