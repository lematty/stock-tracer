import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileTypes } from '../models';

@Component({
  selector: 'app-choose-file-type',
  templateUrl: './choose-file-type.component.html',
  styleUrls: ['./choose-file-type.component.less']
})
export class ChooseFileTypeComponent {

  FileTypes = FileTypes;

  constructor(public dialogRef: MatDialogRef<ChooseFileTypeComponent>) { }

  chooseDataType(fileType: FileTypes) {
    this.dialogRef.close(fileType);
  }

  cancel() {
    this.dialogRef.close();
  }
}
