import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../services/data.service';
import {DatePipe} from '@angular/common';
import {ProductService} from '../../../services/product.service';
import {
  MovimientosCatalog,
  PostMovimientos,
  Cliente,
  AlmacenProducto
} from '../../../model/interfaces/interfaces';
import {InventoriesService} from '../../../services/inventories.service';

@Component({
  selector: 'app-operation-page',
  templateUrl: './operation-page.component.html',
  styleUrls: ['./operation-page.component.scss']
})
export class OperationPageComponent implements OnInit {
  formGroup: FormGroup;
  datePipe = new DatePipe('en-US');
  selectedValue: any;
  showPage = false;
  enabletypeMov = false;
  enableCant = false;
  almacenRef = 0;
  cantMaxP = 1000;
  cantMinP = 1;
  product = null;
  movimientos: MovimientosCatalog[] = [];
  products: AlmacenProducto[] = [];
  filteredOptions: Cliente[] = [];

  constructor(
    private productService: ProductService,
    private inventoriesService: InventoriesService,
    private dataService: DataService
  ) {
    this.buildForm();
    this.formGroup.get('product').valueChanges.subscribe(product => {
      this.product = product;
      this.enabletypeMov = true;
    });
    this.formGroup.get('movId').valueChanges.subscribe(movId => {
      this.cantMaxP = this.product ? this.product.cantidad : 1000;
      this.enableCant = true;
    });
  }

  ngOnInit(): void {
    this.getCatalogMovs();
  }

  getClientSelected(client): void {
    this.almacenRef = client.almacenId || client.id;
    this.selectedClient(client);
  }

  selectedClient(client: any): void {
    this.inventoriesService.getProducts(this.almacenRef).subscribe(products => {
      this.products = products;
      setTimeout(() => {
        this.dataService.setIsLoading(false);
        this.showPage = true;
      }, 100);
    }, (error) => {
      this.dataService.setGeneralNotificationMessage(error);
      this.dataService.setIsLoading(false);
    });
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

  private buildForm = () => {
    this.formGroup = new FormGroup({
      product: new FormControl(null, [Validators.required]),
      guide: new FormControl('', []),
      date: new FormControl(new Date().toISOString(), [Validators.required]),
      count: new FormControl('', [Validators.required]),
      movId: new FormControl(null, [Validators.required]),
    });
  }

  saveData(): void {
    this.dataService.setIsLoading(true);
    const movId = this.formGroup.value.movId;
    const userAlmacen = this.dataService.getUser().almacenId;
    const data: PostMovimientos = {
      almacenId: movId === 1 ? userAlmacen : this.almacenRef ,
      almacenIdRef: movId === 1 ? this.almacenRef : userAlmacen ,
      cantidad: this.formGroup.value.count,
      fechaMovimiento: this.datePipe.transform(this.formGroup.value.date, 'dd/MM/yyyy'),
      guia: this.formGroup.value.guide,
      productoId: this.formGroup.value.product.productoId,
      tipoMovimiento: movId,
    };
    this.sendRequestAction(data);
  }

  sendRequestAction(data): void {
    this.inventoriesService.postMovimiento(data).subscribe(res => {
      console.log(res);
      setTimeout(() => {
        this.resetData();
      }, 200);
    }, error => {
      this.dataService.setGeneralNotificationMessage(error);
      this.dataService.setIsLoading(false);
    });
  }

  resetData(): void {
    this.formGroup.reset();
    this.showPage = false;
    this.selectedValue = null;
    this.almacenRef = 0;
    this.movimientos = [];
    this.products = [];
    this.filteredOptions = [];
  }

  displayName(client): string {
    return client ? client.nombre : client;
  }

}
