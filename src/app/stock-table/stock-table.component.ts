import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StockDataService } from '../services/stock-data.service';
import { CalculationsService } from '../services/calculations.service';
import { FormattedRow } from '../models';
import { FormatTableDataService } from '../services';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.less']
})
export class StockTableComponent {
  @Input() dataSource: FormattedRow[];

  @Output() removeRow: EventEmitter<string> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<FormattedRow>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'symbol',
    'name',
    // 'sector',
    'shares',
    'averagePrice',
    'buyPrice',
    'marketPrice',
    'costBasis',
    'marketValue',
    'gainLoss',
    'growth',
    'eps',
    'pE',
    'annualDividend',
    'dividendYeild',
    'yeildOnCost',
    'annualIncome',
    'modify',
  ];

  sectorTypes = [
    'Technology',
    'Oil/Gas'
  ];

  constructor(
    private stockDataService: StockDataService,
    private calculationsService: CalculationsService,
    private formatTableDataService: FormatTableDataService,
    ) {}

  // async fetchAndCalculateData(rawData: BaseRow[]) {
  //   // this.tableData = await this.formatTableDataService.convertImportedData(rawData);
  //   this.table.dataSource = this.tableData;
  //   console.log('fetchAndCalculateData', this.tableData);
  // }

  getAverageDividendYeild(): number {
    return this.calculationsService.getAverage(this.dataSource, 'dividendYeild');
  }

  getAverageMarketPrice(): number {
    return this.calculationsService.getAverage(this.dataSource, 'marketPrice');
  }

  getAveragePrice(): number {
    return this.calculationsService.getAverage(this.dataSource, 'averagePrice');
  }

  getCostBasis(shares: number, averagePrice: number): number {
    return shares * averagePrice;
  }

  getMarketValue(shares: number, marketPrice: number): number {
    return shares * marketPrice;
  }

  getGainLoss(marketValue: number, costBasis: number): number {
    return marketValue - costBasis;
  }

  getGrowth(marketValue: number, costBasis: number): number {
    return (marketValue - costBasis) / costBasis;
  }

  getTotalShares(): number {
    return this.calculationsService.getSum(this.dataSource, 'shares');
  }

  getTotalAnnualDividend(): number {
    return this.calculationsService.getSum(this.dataSource, 'annualDividend');
  }

  getTotalAnnualIncome(): number {
    return this.calculationsService.getSum(this.dataSource, 'annualIncome');
  }

  onClickRemove(symbol: string) {
    this.removeRow.emit(symbol);
  }
}
