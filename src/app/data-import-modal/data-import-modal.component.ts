import { Component, OnInit } from '@angular/core';
import { FileParseService } from '../services/file-parse.service';

enum ImportTypes {
  CSV = 'CSV',
  JSON = 'JSON'
}

enum FormSteps {
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
  ImportTypes = ImportTypes;
  currentStep: FormSteps = FormSteps.Type;
  selectedImportType: ImportTypes;

  constructor(private fileParseService: FileParseService) { }

  ngOnInit(): void {
  }

  changeFormStep(step: FormSteps) {
    this.currentStep = step;
  }

  chooseImportType(type: ImportTypes) {
    console.log(type);
    this.selectedImportType = type;
    this.changeFormStep(FormSteps.Upload);
  }

  uploadData() {

  }

  inputChange(fileInputEvent: any) {
    console.log(fileInputEvent);
    console.log(fileInputEvent.target.files[0]);
    this.parseFile(fileInputEvent);
  }

  cancelImport() {
    this.changeFormStep(FormSteps.Type);
    this.selectedImportType = undefined;
  }

  parseFile(fileInputEvent: any) {
    this.fileParseService.loadFile(fileInputEvent);
  }

}
