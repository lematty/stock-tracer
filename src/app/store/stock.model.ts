export interface Stock {
  // id: string;
  name?: string;
  symbol: string;
  sector?: string;
  shares: number;
  averagePrice?: number;
  buyPrice: number;
  marketPrice?: number;
  costBasis?: number;
  marketValue?: number;
  gainLoss?: number;
  growth?: number;
  eps?: number;
  pE?: number;
  annualDividend?: number;
  dividendYeild: number;
  yeildOnCost?: number;
  annualIncome?: number;
}
