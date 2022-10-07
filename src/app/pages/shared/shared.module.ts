import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPersonAutocompleteComponent } from './search-person-autocomplete/search-person-autocomplete.component';
import {MATERIAL_COMPONENTS} from '../../app.material';
import {CHILD_IMPORTS} from '../../app.child.imports';
import {ReactiveFormsModule} from '@angular/forms';
import { StatusPipe } from './pipes/status.pipe';


@NgModule({
  declarations: [SearchPersonAutocompleteComponent, StatusPipe],
  imports: [
    CommonModule,
    MATERIAL_COMPONENTS,
    CHILD_IMPORTS,
    ReactiveFormsModule
  ],
  exports: [SearchPersonAutocompleteComponent, StatusPipe]
})
export class SharedModule { }
