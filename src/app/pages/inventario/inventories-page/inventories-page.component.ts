import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {InventoriesService} from '../../../services/inventories.service';
import {AlmacenProducto} from '../../../model/interfaces/interfaces';
import {XlsGenerateService} from '../../../services/xls-generate.service';

@Component({
  selector: 'app-inventories-page',
  templateUrl: './inventories-page.component.html',
  styleUrls: ['./inventories-page.component.scss']
})
export class InventoriesPageComponent implements OnInit {
  dataFromService: Array<AlmacenProducto> = [];
  dataInventories: Array<AlmacenProducto> = [];
  showTable = false;
  tiposFilter = [];
  countFilter = [];

  constructor(
    private dataService: DataService,
    private inventariosService: InventoriesService,
    private excelService: XlsGenerateService
  ) { }

  ngOnInit(): void {
    this.dataService.setIsLoading(true);
    this.getDataInventories(this.dataService.getUser().almacenId);
  }

  getDataInventories(almacenId: number): void {
    this.inventariosService.getProducts(almacenId)
      .subscribe(data => {
        this.dataFromService = data;
        this.dataInventories = data;
        this.tiposFilter = Array.from(new Set(data.map(i => i.tipo)));
        this.countFilter = Array.from(new Set(data.map(i => i.cantidad)));
        this.showTable = true;
        this.dataService.setIsLoading(false);
      }, error => {
        this.dataService.setGeneralNotificationMessage(error);
        this.dataService.setIsLoading(false);
      });
  }

  filterByType(type): void {
    this.showTable = false;
    const tipo = type === 'Todos' ? '' : type;
    this.dataInventories = this.dataFromService.filter(i => i.tipo.toString().includes(tipo));
    setTimeout(() => {
      this.showTable = true;
    }, 50);
  }

  filterByCount(count): void {
    this.showTable = false;
    if (count === 'Todos') {
      this.dataInventories = this.dataFromService;
    } else {
      this.dataInventories = this.dataFromService.filter(i => i.cantidad === count);
    }
    setTimeout(() => {
      this.showTable = true;
    }, 50);
  }

  reloadData(reload): void {
    if (reload) {
      this.showTable = false;
      this.dataService.setIsLoading(true);
      this.getDataInventories(this.dataService.getUser().almacenId);
    }
  }

  exportData(): void {
    const reformattedData = this.dataInventories.map(obj => {
      const rObj = {};
      // tslint:disable-next-line:forin
      for (const clave in obj) {
        rObj[clave] = obj[clave];
      }
      return rObj;
    });
    if (reformattedData.length !== 0) {
      this.excelService.exportAsExcelFile(reformattedData, 'Productos');
    }
  }

}
