import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';
import {MATERIAL_COMPONENTS} from '../../app.material';
import {CHILD_IMPORTS} from '../../app.child.imports';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [ProductPageComponent],
    imports: [
        CommonModule,
        ProductoRoutingModule,
        MATERIAL_COMPONENTS,
        CHILD_IMPORTS,
        SharedModule
    ]
})
export class ProductoModule { }
