import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {DialogComponents} from '../../../constants/app-config';
import {MatDialogConfig} from '@angular/material/dialog';
import {MovimientosCatalog, PostMovimientos, User} from '../../../model/interfaces/interfaces';
import {DatePipe} from '@angular/common';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss']
})
export class TableProductComponent implements AfterViewInit{
  @Input() data: any;
  @Output() reloadData = new EventEmitter<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['id', 'nombreProducto', 'nombreAlmacen', 'tipo', 'cantidad', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>();
  dialogs = DialogComponents;
  userAlmacen: User;
  movimientos: Array<MovimientosCatalog> = [];
  datePipe = new DatePipe('en-US');

  constructor(
    private dataService: DataService,
    private router: Router,
    private productService: ProductService
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.userAlmacen = this.dataService.getUser();
    this.getCatalogMovs();
    this.setDataSource(this.data);
  }

  setDataSource(dataSource: Array<any>): void {
    setTimeout(() => {
      this.dataSource.data = dataSource;
      this.dataSource.paginator = this.paginator;
    }, 100);
  }

  redirectProduct(product): void {
    this.router.navigate(['producto']).then( () => {
      this.dataService.setProduct(product);
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

  openDialog(id: number, product): void {
    const component = this.dialogs.find(i => i.id === id);
    console.log(this.movimientos);
    console.log(component);
    const movId = this.movimientos.find(i => i.nombre.toLowerCase().includes(component.value));
    const config = new MatDialogConfig();

    const toSend: PostMovimientos = {
      almacenId: null,
      almacenIdRef: this.userAlmacen.almacenId, // this.formGroup.value.almacenOrigen,
      cantidad: null, // this.formGroup.value.count,
      fechaMovimiento: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      guia: null, // this.formGroup.value.guide,
      productoId: product.productoId,
      tipoMovimiento: movId.id
    };

    config.width = 'auto';
    config.autoFocus = false;
    config.data = {
      toSend,
      config: {
        name: component.name,
        cantProduct: product.cantidad
      }
    };

    const dialogRef = this.dataService.openDialog(component, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed desde component:', result);
      if (result) {
        this.reloadData.emit(true);
      }
    });
  }

}
