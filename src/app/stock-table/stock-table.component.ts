import { Component, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StockDataService } from '../services/stock-data.service';
import { CalculationsService } from '../services/calculations.service';
import { StockTableItem, ImportData } from '../models';
import { FormatTableDataService } from '../services';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.less']
})
export class StockTableComponent {
  @Input()
  set dataSource(dataSource: ImportData[]) {
    this._dataSource = dataSource;
    this.fetchAndCalculateData(this._dataSource);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StockTableItem>;

  public _dataSource: ImportData[];

  tableData = [];

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

  async fetchAndCalculateData(rawData: ImportData[]) {
    this.tableData = await this.formatTableDataService.convertImportedData(rawData);
    this.table.dataSource = this.tableData;
    console.log('fetchAndCalculateData', this.tableData);
  }

  getAverageDividendYeild(): number {
    return this.calculationsService.getAverage(this.tableData, 'dividendYeild');
  }

  getAverageMarketPrice(): number {
    return this.calculationsService.getAverage(this.tableData, 'marketPrice');
  }

  getAveragePrice(): number {
    return this.calculationsService.getAverage(this.tableData, 'averagePrice');
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
    return this.calculationsService.getSum(this.tableData, 'shares');
  }

  getTotalAnnualDividend(): number {
    return this.calculationsService.getSum(this.tableData, 'annualDividend');
  }

  getTotalAnnualIncome(): number {
    return this.calculationsService.getSum(this.tableData, 'annualIncome');
  }
}
