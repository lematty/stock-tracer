import { FormattedRow } from '../models';

export interface AppState {
  table: {
    stocks: FormattedRow[];
    errors: any;
  };
  selections: {
    selectedStocks: FormattedRow[];
    errors: any;
  };
}
