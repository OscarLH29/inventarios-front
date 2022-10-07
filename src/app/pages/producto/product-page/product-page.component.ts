import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {AlmacenProducto, MovimientosCatalog, PostMovimientos, Producto, User} from '../../../model/interfaces/interfaces';
import {TransferProductComponent} from '../../../components/modals/transfer-product/transfer-product.component';
import {DialogComponents} from '../../../constants/app-config';
import {MatDialogConfig} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product: AlmacenProducto;
  user: User;
  userAlmacen: number;
  movimientos: Array<MovimientosCatalog> = [];
  datePipe = new DatePipe('en-US');
  dialogs = DialogComponents;

  constructor(
    private dataService: DataService,
    private productService: ProductService,
    private router: Router
  ) {
    this.dataService.getProduct().subscribe((data) => {
        this.product = data;
      }
    );
  }

  ngOnInit(): void {
    this.user = this.dataService.getUser();
    this.userAlmacen = this.user.almacenId;
    this.getCatalogMovs();
  }

  getCatalogMovs(): void {
    this.dataService.setIsLoading(true);
    this.productService.getMovsCatalog()
      .subscribe((res) => {
        this.movimientos = res;
        this.dataService.setIsLoading(false);
      }, (error) => {
        this.dataService.setGeneralNotificationMessage(error);
        this.dataService.setIsLoading(false);
      });
  }

  openDialog(id: number): void {
    const component = this.dialogs.find(i => i.id === id);
    const movId = this.movimientos.find(i => i.nombre.toLowerCase().includes(component.value));
    const config = new MatDialogConfig();

    const toSend: PostMovimientos = {
      almacenId: null,
      almacenIdRef: this.userAlmacen, // this.formGroup.value.almacenOrigen,
      cantidad: null, // this.formGroup.value.count,
      fechaMovimiento: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      guia: null, // this.formGroup.value.guide,
      productoId: this.product.productoId,
      tipoMovimiento: movId.id
    };

    config.width = 'auto';
    config.autoFocus = false;
    config.data = {
      toSend,
      config: {
        name: component.name,
        cantProduct: this.product.cantidad
      }
    };

    const dialogRef = this.dataService.openDialog(component, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed desde component:', result);
      if (result) {
        this.router.navigate(['inventario']);
      }
    });
  }


}
