import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventoriesPageComponent } from './inventories-page/inventories-page.component';
import {MATERIAL_COMPONENTS} from '../../app.material';
import {CHILD_IMPORTS} from '../../app.child.imports';
import { TableProductComponent } from './table-product/table-product.component';
import { GuideTableComponent } from './guide-table/guide-table.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [InventoriesPageComponent, TableProductComponent, GuideTableComponent],
    imports: [
        CommonModule,
        InventarioRoutingModule,
        MATERIAL_COMPONENTS,
        CHILD_IMPORTS,
        SharedModule
    ]
})
export class InventarioModule { }
