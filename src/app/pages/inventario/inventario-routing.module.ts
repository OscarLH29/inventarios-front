import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InventoriesPageComponent} from './inventories-page/inventories-page.component';

const routes: Routes = [
  {
    path: '',
    component: InventoriesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
