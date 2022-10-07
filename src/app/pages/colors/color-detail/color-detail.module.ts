import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorDetailRoutingModule } from './color-detail-routing.module';
import { ColorDetailComponent } from './color-detail.component';
import { MATERIAL_COMPONENTS } from 'src/app/app.material';
import { CHILD_IMPORTS } from 'src/app/app.child.imports';


@NgModule({
  declarations: [ColorDetailComponent],
  imports: [
    CommonModule,
    ColorDetailRoutingModule,
    MATERIAL_COMPONENTS,
    CHILD_IMPORTS
  ]
})
export class ColorDetailModule { }
