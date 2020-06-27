import { Component, Output, EventEmitter } from '@angular/core';
import { FileParseService } from '../services/file-parse.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ImportMatchTypes, ImportMatchNames } from '../models';
import { Store, select } from '@ngrx/store';
import { ImportState } from '@ngrx/store-devtools/src/actions';
import { Observable } from 'rxjs';


enum ImportTypes {
  CSV = 'CSV',
  JSON = 'JSON'
}

enum FormSteps {
  Type,
  Loading,
  SelectSymbol,
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

  constructor(
    public dialogRef: MatDialogRef<DataImportModalComponent>,
    private fileParseService: FileParseService,
    private store: Store<ImportState>
    ) { }

  changeFormStep(step: FormSteps) {
    this.currentStep = step;
  }

  chooseImportType(type: ImportTypes) {
    this.selectedImportType = type;
  }

  inputChange(fileInputEvent: any) {
    this.parseFile(fileInputEvent.target.files[0]);
  }

  async parseFile(fileInputEvent: any) {
    this.currentStep = FormSteps.Loading;
    const csvData = await this.fileParseService.extractData(fileInputEvent);
    this.headers = csvData.headers;
    this.rows = csvData.rows;
    this.currentStep = FormSteps.SelectSymbol;
  }

  selectHeader(selection: { type: ImportMatchTypes, index: number }) {
    if (selection.index && selection.index === -1) {
      return;
    }
    this.rank[selection.type] = selection.index;
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
    this.dialogRef.close({ rank: this.rank, headers: this.headers, rows: this.rows });
  }
}
