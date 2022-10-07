import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperacionesRoutingModule } from './operaciones-routing.module';
import { OperationPageComponent } from './operation-page/operation-page.component';
import {MATERIAL_COMPONENTS} from '../../app.material';
import {CHILD_IMPORTS} from '../../app.child.imports';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [OperationPageComponent],
  imports: [
    CommonModule,
    OperacionesRoutingModule,
    MATERIAL_COMPONENTS,
    CHILD_IMPORTS,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class OperacionesModule { }
