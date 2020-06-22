import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImportMatchTypes, ImportMatchNames } from '../models';

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
    this.headerIndex = headerIndex;
  }

  emitSelectedType() {
    this.selectedType.emit({ type: this.type, index: this.headerIndex });
  }

}
