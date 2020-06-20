import { Component, OnInit } from '@angular/core';

type ImportTypes = 'CSV' | 'JSON';
enum FormSteps {
  Import = 'import',
  Type = 'type',
  Upload = 'upload',
}

@Component({
  selector: 'app-data-import-modal',
  templateUrl: './data-import-modal.component.html',
  styleUrls: ['./data-import-modal.component.less']
})
export class DataImportModalComponent implements OnInit {
  FormSteps = FormSteps;
  currentStep: FormSteps = FormSteps.Import;
  importType: ImportTypes;

  constructor() { }

  ngOnInit(): void {
  }

  changeFormStep(step: FormSteps) {
    this.currentStep = step;
  }

  chooseImportType(type: ImportTypes) {
    this.importType = type;
    this.changeFormStep(FormSteps.Upload);
  }

  uploadData() {

  }

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }

  cancelImport() {
    this.changeFormStep(FormSteps.Import);
    this.importType = undefined;
  }

}
