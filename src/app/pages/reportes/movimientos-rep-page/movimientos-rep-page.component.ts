import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ReportsService} from '../../../services/reports.service';
import {DataService} from '../../../services/data.service';
import {MovimientosRep, User} from '../../../model/interfaces/interfaces';
import {DatePipe} from '@angular/common';
import {ConfirmActionComponent} from '../../../components/modals/confirm-action/confirm-action.component';
import {InventoriesService} from '../../../services/inventories.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {XlsGenerateService} from '../../../services/xls-generate.service';

@Component({
  selector: 'app-movimientos-rep-page',
  templateUrl: './movimientos-rep-page.component.html',
  styleUrls: ['./movimientos-rep-page.component.scss']
})
export class MovimientosRepPageComponent implements OnInit {
  datePipe = new DatePipe('en-US');
  range: FormGroup;
  sizeOptions = [5, 15, 30, 50];
  cards: Array<MovimientosRep> = [];
  cardsDisplay: Array<MovimientosRep> = [];
  showReport = false;
  lengthCards: number;
  pageSize = 10;
  startDate: string;
  endDate: string;
  user: User;
  statusColors = [
    {status: 'aceptado', color: '#057605'},
    {status: 'rechazado', color: '#8d0202'},
    {status: 'pendiente', color: '#7f5695'},
  ];

  constructor(private reportService: ReportsService,
              private inventoriesService: InventoriesService,
              private excelService: XlsGenerateService,
              public dialog: MatDialog,
              private dataService: DataService) {
    this.buildForm();
    this.user = this.dataService.getUser();
  }

  ngOnInit(): void {
    this.getMonth();
  }

  getMonth(): void {
    const month = this.dataService.getMonthActually();
    this.startDate = this.datePipe.transform(month.primerDia, 'dd/MM/yyyy');
    this.endDate = this.datePipe.transform(month.ultimoDia, 'dd/MM/yyyy');
    this.getDataMovimientos();
  }

  dateChange(): void {
    this.startDate = this.datePipe.transform(this.range.value.start, 'dd/MM/yyyy');
    this.endDate = this.datePipe.transform(this.range.value.end, 'dd/MM/yyyy');
    this.getDataMovimientos();
  }


  showConfirm(type, data): void{
    const config = new MatDialogConfig();
    config.width = 'auto';
    config.autoFocus = false;
    config.data = {
      typeName: type === 2 ? 'Aceptar' : 'Rechazar'
    };
    this.dialog.open(ConfirmActionComponent, config)
      .afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
         this.sendRequestAction(type, data);
        }
      });
  }

  sendRequestAction(type, data): void {
    this.dataService.setIsLoading(true);
    this.showReport = false;
    this.inventoriesService.acceptCancelRequest(type, data.id).subscribe(res => {
      this.getDataMovimientos();
    }, error => {
      this.dataService.setGeneralNotificationMessage(error);
      this.dataService.setIsLoading(false);
    });
  }

  getDataMovimientos(): void {
    this.dataService.setIsLoading(true);
    this.showReport = false;
    this.reportService.getMovimients(this.startDate, this.endDate, this.user.almacenId).subscribe(data => {
      this.cards = data;
      this.setDisplayItems(0, this.pageSize);
      setTimeout(() => {
        this.dataService.setIsLoading(false);
        this.showReport = true;
      }, 100);
    }, error => {
      this.dataService.setGeneralNotificationMessage(error);
      this.dataService.setIsLoading(false);
    });
  }

  private buildForm(): void {
    this.range = new FormGroup({
      start: new FormControl(null),
      end: new FormControl(null),
    });
  }

  typing(evt): void {
    const value = evt.target.value || '';
    this.setDisplayItems(0, this.pageSize, value.toLowerCase());
    setTimeout(() => {
      this.dataService.setIsLoading(false);
      this.showReport = true;
    }, 100);

    console.log(evt.target.value);
  }

  changePage(evt): void {
    console.log(evt);
    this.pageSize = evt.pageSize;
    this.setDisplayItems(evt.pageIndex, evt.pageSize);
  }

  setDisplayItems(pageIndex, pageSize, filterValue = ''): void {
    const begin = pageIndex * pageSize;
    const lastPageIndex = ((pageIndex * pageSize) + pageSize);
    const lastArrayIndex = this.cards.length;
    const end = lastPageIndex > lastArrayIndex ? lastArrayIndex : lastPageIndex;
    const cardsData = filterValue === '' ? this.cards : this.cards.filter(i => i.nombreProducto.toLowerCase().includes(filterValue));

    this.cardsDisplay = cardsData.slice(begin, end);
    this.lengthCards = this.cards.length;
  }

  exportData(): void {
    const reformattedData = this.cards.map(obj => {
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

  getStatusColor(status): string {
    const estatus = status.toLowerCase();
    return this.statusColors.find(i => i.status === estatus).color;
  }

}
