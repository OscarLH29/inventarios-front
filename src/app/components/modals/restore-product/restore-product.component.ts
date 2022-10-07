import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-restore-product',
  templateUrl: './restore-product.component.html',
  styleUrls: ['./restore-product.component.scss']
})
export class RestoreProductComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RestoreProductComponent>,
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
    this.dialogRef.close(false);
  }

}
