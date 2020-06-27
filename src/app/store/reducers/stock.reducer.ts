import { createReducer, on, Action } from '@ngrx/store';
import * as StockActions from '../actions/stock.actions';
import { FormattedRow } from '../../models';

// export interface State {
//   stocks: FormattedRow[];
// }

// export const initialStocks: State = {
//   stocks: []
// };

export const initialStocks: FormattedRow[] = [];

export const stocksReducer = createReducer<FormattedRow[]>(
  initialStocks,
  on(StockActions.addStockSuccess, (state, { stock }) => state.concat({ ...stock })),
  on(StockActions.addStockFail, (state, { error }) => error),
  // on(StockActions.addStockSuccess, (state, { stock }) => ({ ...state, stocks: [...state.stocks, stock] })),
  // on(StockActions.addStockFail, (state, { error }) => error),
  on(StockActions.removeStockSuccess, (state, { symbol }) => state.filter(row => row.symbol !== symbol)),
  on(StockActions.removeAllRows, (state) => ({ ...state, baseRows: [] })),
);


// export function reducer(state: State | undefined, action: Action) {
//   return stocksReducer(state, action);
// }
