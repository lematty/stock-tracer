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
  @Output() closeForm: EventEmitter<void> = new EventEmitter();

  stock: FormGroup;

  constructor() { }

  ngOnInit() {
    this.stock = this.clearForm();
  }

  close() {
    this.closeForm.emit();
  }

  nextStock() {
    this.addNewRow.emit(this.stock.value);
    this.stock = this.clearForm();
  }

  clearForm(): FormGroup {
    return new FormGroup({
      [BaseHeader.Symbol]: new FormControl('', [Validators.required, Validators.minLength(1)]),
      [BaseHeader.Shares]: new FormControl(0, [Validators.required, Validators.min(1), Validators.minLength(1)]),
      [BaseHeader.BuyPrice]: new FormControl(0, [Validators.required, Validators.min(1), Validators.minLength(1)]),
      [BaseHeader.DividendYield]: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

}
