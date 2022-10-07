import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InventoriesService} from '../../../services/inventories.service';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-transfer-product',
  templateUrl: './transfer-product.component.html',
  styleUrls: ['./transfer-product.component.scss']
})
export class TransferProductComponent implements OnInit {
  showLoader = false;
  showForm = false;
  formGroup: FormGroup;
  cantMinP = 1;
  cantMaxP = 10000;
  filteredOptions = [];

  constructor(
    private inventoriesService: InventoriesService,
    private dataService: DataService,
    public dialogRef: MatDialogRef<TransferProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.cantMaxP = this.data.config.cantProduct ? this.data.config.cantProduct : 1000;
  }

  private buildForm = () => {
    this.formGroup = new FormGroup({
      guide: new FormControl('', []),
      count: new FormControl('', [Validators.required])
    });
  }

  acceptRequest(): void {
    this.dataService.setIsLoading(false);
    this.data.toSend.guia = this.formGroup.value.guide;
    this.data.toSend.cantidad = this.formGroup.value.count;
    this.inventoriesService.postMovimiento(this.data.toSend).subscribe(res => {
      this.closeDialog(res);
    }, error => {
      this.dataService.setGeneralNotificationMessage(error);
      this.dataService.setIsLoading(false);
    });
  }

  closeDialog(res): void {
    this.dialogRef.close(res);
  }

  getClientSelected(cliente): void {
    this.showForm = !!cliente;
    this.data.toSend.almacenId = cliente.almacenId || cliente.id;
    console.log(this.data.toSend);
  }

  // newLetter(word: any): void {
  //   // const expresion = /^[,0-9]+$/;
  //   // const ok = expresion.exec(word);
  //   this._filter(word);
  // }
  //
  // _filter(value: any): void {
  //   // this._staffingService.getPredictionName(value, this.staffingTO.idCountry)
  //   //   .subscribe((res) => {
  //   //     this.filteredOptions = res;
  //   //     this._dataService.setIsLoadingEvent(false);
  //   //   }, (error: HttpErrorResponse) => {
  //   //     this.httpErrorResponse(error);
  //   //     this._dataService.setIsLoadingEvent(false);
  //   //   });
  //   this.filteredOptions.push(value);
  // }
  //
  // displayFn(event): void {
  //   this.valueSelected = event.option.value;
  // }

}
