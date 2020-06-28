import { FormattedRow } from '../models';

export interface AppState {
  stocks: {
    entities: FormattedRow[];
    errors: any;
  };
  selectedStocks: {
    entities: FormattedRow[];
    errors: any;
  };
}
