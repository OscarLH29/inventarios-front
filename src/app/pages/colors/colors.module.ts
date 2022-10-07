import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorsRoutingModule } from './colors-routing.module';
import { ColorsComponent } from './colors.component';
import { MATERIAL_COMPONENTS } from 'src/app/app.material';
import { CHILD_IMPORTS } from 'src/app/app.child.imports';


@NgModule({
  declarations: [ColorsComponent],
  imports: [
    CommonModule,
    ColorsRoutingModule,
    MATERIAL_COMPONENTS,
    CHILD_IMPORTS
  ]
})
export class ColorsModule { }
