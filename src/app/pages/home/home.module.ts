import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MATERIAL_COMPONENTS } from 'src/app/app.material';
import { CHILD_IMPORTS } from 'src/app/app.child.imports';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MATERIAL_COMPONENTS,
    CHILD_IMPORTS
  ]
})
export class HomeModule { }
