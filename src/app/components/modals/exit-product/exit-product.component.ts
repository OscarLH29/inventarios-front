import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exit-product',
  templateUrl: './exit-product.component.html',
  styleUrls: ['./exit-product.component.scss']
})
export class ExitProductComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ExitProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm = () => {
    this.formGroup = new FormGroup({
      guide: new FormControl('', []),
      count: new FormControl('', [Validators.required]),
      almacenRef: new FormControl(null, [Validators.required]),
    });
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

}
