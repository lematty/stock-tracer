import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

enum ImportMatchTypes {
  Ticker = 'ticker',
  Shares = 'shares',
  BuyPrice = 'buyPrice',
  DividendYeild = 'dividendYeild',
}

enum ImportMatchNames {
  Ticker = 'ticker',
  Shares = 'shares',
  BuyPrice = 'buy price',
  DividendYeild = 'dividend yeild',
}

@Component({
  selector: 'app-match-columns-modal',
  templateUrl: './match-columns-modal.component.html',
  styleUrls: ['./match-columns-modal.component.less']
})
export class MatchColumnsModalComponent implements OnInit {
  @Input() name: ImportMatchNames;
  @Input() type: ImportMatchTypes;
  @Input() index: number;
  @Input() headers: string[];

  @Output() selectedType: EventEmitter<{ type: ImportMatchTypes, index: number }> = new EventEmitter();

  headerIndex: number;

  constructor() { }

  ngOnInit(): void {
  }

  selectHeader(headerIndex: number) {
    console.log('selectHeader() => headerIndex: ', headerIndex);
    this.headerIndex = headerIndex;
  }

  emitSelectedType() {
    console.log('emitSelectedType() => headerIndex: ', this.headerIndex);
    this.selectedType.emit({ type: this.type, index: this.headerIndex });
  }

}
