import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { MovimientosRepPageComponent } from './movimientos-rep-page/movimientos-rep-page.component';
import {MATERIAL_COMPONENTS} from '../../app.material';
import {CHILD_IMPORTS} from '../../app.child.imports';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [MovimientosRepPageComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    MATERIAL_COMPONENTS,
    CHILD_IMPORTS,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ReportesModule { }
