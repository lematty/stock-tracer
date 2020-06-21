import { Component, Output, EventEmitter } from '@angular/core';
import { FileParseService } from '../services/file-parse.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ImportMatchTypes, ImportMatchNames } from '../models';


enum ImportTypes {
  CSV = 'CSV',
  JSON = 'JSON'
}

enum FormSteps {
  Type,
  Loading,
  SelectTicker,
  SelectShares,
  SelectBuyPrice,
  SelectDividendYeild,
  Success,
}

interface MatchValidator {
  [type: string]: number;
}

@Component({
  selector: 'app-data-import-modal',
  templateUrl: './data-import-modal.component.html',
  styleUrls: ['./data-import-modal.component.less']
})
export class DataImportModalComponent {

  @Output() verifiedHeaders: EventEmitter<string[][]> = new EventEmitter();
  @Output() verifiedRows: EventEmitter<string[]> = new EventEmitter();

  FormSteps = FormSteps;
  ImportTypes = ImportTypes;
  ImportMatchTypes = ImportMatchTypes;
  ImportMatchNames = ImportMatchNames;
  currentStep: FormSteps = FormSteps.Type;
  selectedImportType: ImportTypes;


  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  headers: string[] = [];
  rows: string[][] = [];

  rank: MatchValidator = {};

  constructor(public dialogRef: MatDialogRef<DataImportModalComponent>, private fileParseService: FileParseService) { }

  changeFormStep(step: FormSteps) {
    this.currentStep = step;
  }

  chooseImportType(type: ImportTypes) {
    console.log(type);
    this.selectedImportType = type;
  }

  inputChange(fileInputEvent: any) {
    console.log(fileInputEvent);
    console.log(fileInputEvent.target.files[0]);
    this.parseFile(fileInputEvent.target.files[0]);
  }

  async parseFile(fileInputEvent: any) {
    this.currentStep = FormSteps.Loading;
    const csvData = await this.fileParseService.extractData(fileInputEvent);
    this.headers = csvData.headers;
    this.rows = csvData.rows;
    console.log(this.headers, this.rows);
    this.currentStep = FormSteps.SelectTicker;
  }

  selectHeader(selection: { type: ImportMatchTypes, index: number }) {
    if (selection.index && selection.index === -1) {
      return;
    }
    console.log(selection);
    this.rank[selection.type] = selection.index;
    console.log(this.rank);
    const nextStep = this.currentStep + 1;
    this.changeFormStep(nextStep);
  }

  verifySelectedHeaders() {
    let count = 0;
    for (const type in ImportMatchTypes) {
      if (!!this.rank[type]) {
        count++;
      }
    }
    return count === 4;
  }

  cancel() {
    // this.closeModal.emit();
    this.dialogRef.close({ rank: this.rank, headers: this.headers, rows: this.rows });
    // this.dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${JSON.stringify(result)}`);
    // });
  }
}
