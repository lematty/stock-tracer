import { Component, OnInit, Output } from '@angular/core';
import { FileParseService } from '../services/file-parse.service';

enum ImportTypes {
  CSV = 'CSV',
  JSON = 'JSON'
}

enum FormSteps {
  Type = 'type',
  Loading = 'loading',
  SelectTicker = 'selectTicker',
  SelectShares = 'selectShares',
  SelectBuyPrice = 'selectBuyPrice',
  SelectDividendYeild = 'selectDividendYeild',
  Success = 'success',
}

enum ImportMatchTypes {
  Ticker = 'ticker',
  Shares = 'shares',
  BuyPrice = 'buyPrice',
  DividendYeild = 'dividendYeild',
}

enum ImportMatchNames {
  Ticker = 'Ticker',
  Shares = 'Shares',
  BuyPrice = 'Buy Price',
  DividendYeild = 'Dividend Yeild',
}
// type ImportMatchTypes =  'ticker' | 'shares' | 'buyPrice' | 'dividendYeild';

interface MatchValidator {
  [type: string]: {
    index: number;
    // header: string;
  };
}

@Component({
  selector: 'app-data-import-modal',
  templateUrl: './data-import-modal.component.html',
  styleUrls: ['./data-import-modal.component.less']
})
export class DataImportModalComponent implements OnInit {

  FormSteps = FormSteps;
  ImportTypes = ImportTypes;
  ImportMatchTypes = ImportMatchTypes;
  ImportMatchNames = ImportMatchNames;
  currentStep: FormSteps = FormSteps.Type;
  selectedImportType: ImportTypes;

  headers: string[] = [];
  rows: string[][] = [];

  rank: MatchValidator = {};

  constructor(private fileParseService: FileParseService) { }

  ngOnInit(): void {
  }

  changeFormStep(step: FormSteps) {
    this.currentStep = step;
  }

  chooseImportType(type: ImportTypes) {
    console.log(type);
    this.selectedImportType = type;
    // this.changeFormStep(FormSteps.Upload);
  }

  inputChange(fileInputEvent: any) {
    console.log(fileInputEvent);
    console.log(fileInputEvent.target.files[0]);
    this.parseFile(fileInputEvent.target.files[0]);
  }

  cancelImport() {
    this.changeFormStep(FormSteps.Type);
    this.selectedImportType = undefined;
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
      console.log('returning');
      return;
    }
    console.log(selection);
    this.rank[selection.type] = {
      index: selection.index,
      // header,
    };
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



}
