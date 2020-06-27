import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseHeader, BaseRow } from '../models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stock-form',
  templateUrl: './add-stock-form.component.html',
  styleUrls: ['./add-stock-form.component.less']
})
export class AddStockFormComponent implements OnInit {

  @Output() addNewRow: EventEmitter<BaseRow> = new EventEmitter();

  row: FormGroup;

  constructor() { }

  ngOnInit() {
    this.row = this.newRow();
    this.row.valueChanges.subscribe(data => {
      console.log(data);
    });
  }

  close() {
    // TODO: implement cancel
  }

  nextStock() {
    console.log('row before emit() => ', this.row.value);
    this.addNewRow.emit(this.row.value);
    console.log('adding another stock');
    this.row = this.newRow();
  }

  newRow(): FormGroup {
    return new FormGroup({
      [BaseHeader.Symbol]: new FormControl('', [Validators.required, Validators.minLength(1)]),
      [BaseHeader.Shares]: new FormControl(0, [Validators.required, Validators.min(1), Validators.minLength(1)]),
      [BaseHeader.BuyPrice]: new FormControl(0, [Validators.required, Validators.min(1), Validators.minLength(1)]),
      [BaseHeader.DividendYield]: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

}
