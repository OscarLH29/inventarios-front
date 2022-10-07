import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MATERIAL_COMPONENTS } from 'src/app/app.material';
import { ReactiveFormsModule } from '@angular/forms';
import { CHILD_IMPORTS } from 'src/app/app.child.imports';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MATERIAL_COMPONENTS,
    CHILD_IMPORTS
  ]
})
export class LoginModule { }
