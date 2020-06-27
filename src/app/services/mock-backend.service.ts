import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseRow, FormattedRow } from '../models';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {

  constructor() { }

  addStock(stock: BaseRow): Observable<FormattedRow> {
    console.log('MockBackendService');
    const formattedRow: FormattedRow = this.formatRow(stock);
    return of(formattedRow);
  }

  formatRow(stock: BaseRow): FormattedRow {
    const stockPrice = this.createRandomNumber(this.createRandomNumber(5));
    const dividendPercentages = this.createRandomNumber(1 / 100);
    const marketPrice = stockPrice;
    const dividendYeild = dividendPercentages;
    const costBasis = this.getCostBasis(stock.shares, stock.buyPrice);
    const marketValue = this.getMarketValue(stock.shares, marketPrice);
    const gainLoss = this.getGainLoss(marketValue, costBasis);
    const growth = this.getGrowth(marketValue, costBasis);
    const annualDividend = this.getAnnualDividend(marketPrice, dividendYeild, stock.shares);

    const formattedRow: FormattedRow = {
      symbol: stock.symbol,
      shares: stock.shares,
      averagePrice: 0,
      buyPrice: stock.buyPrice,
      marketPrice,
      costBasis,
      marketValue,
      gainLoss,
      growth,
      eps: 0,
      pE: 0,
      annualDividend,
      dividendYeild,
      yeildOnCost: 0,
      annualIncome: annualDividend,
    };
    console.log('FORMATTED ROW', formattedRow);
    return formattedRow;
  }

  getCostBasis(shares: number, buyPrice: number): number {
    return shares * buyPrice;
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

  getAnnualDividend(marketPrice: number, dividendYeild: number, shares: number): number {
    return marketPrice * (dividendYeild * 100) * shares;
  }

  createRandomNumber(times: number) {
    return Math.random() * times;
  }
}
