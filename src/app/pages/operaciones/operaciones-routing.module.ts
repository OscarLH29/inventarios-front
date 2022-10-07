import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OperationPageComponent} from './operation-page/operation-page.component';

const routes: Routes = [
  {
    path: '',
    component: OperationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacionesRoutingModule { }
