import { Injectable } from '@angular/core';
import { FormattedRow, BaseRow } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FormatTableDataService {

  constructor() { }

  async convertImportedData(rawData: BaseRow[]): Promise<FormattedRow[]> {
    const symbols = rawData.map(row => row.symbol);
    const stockPrices = rawData.map(() => this.createRandomNumber(this.createRandomNumber(5)));
    const dividendPercentages = rawData.map(() => this.createRandomNumber(1) / 100);

    let count = 0;
    const formattedData: FormattedRow[] = rawData.map((row: BaseRow) => {
      const marketPrice = stockPrices[count];
      const dividendYeild = dividendPercentages[count];
      const costBasis = this.getCostBasis(row.shares, row.buyPrice);
      const marketValue = this.getMarketValue(row.shares, marketPrice);
      const gainLoss = this.getGainLoss(marketValue, costBasis);
      const growth = this.getGrowth(marketValue, costBasis);
      const annualDividend = this.getAnnualDividend(marketPrice, dividendYeild, row.shares);

      const formattedRow: FormattedRow = {
        // name: string;
        symbol: row.symbol,
        // sector?: string;
        shares: row.shares,
        averagePrice: 0,
        buyPrice: row.buyPrice,
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

      count++;
      return formattedRow;
    });
    return formattedData;
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
