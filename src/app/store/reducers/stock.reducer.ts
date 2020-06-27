import { createReducer, on } from '@ngrx/store';
import * as StockActions from '../actions/stock.actions';
import { FormattedRow } from '../../models';

export interface State {
  stocks: FormattedRow[];
}

export const initialStocks: FormattedRow[] = [];

export const stocksReducer = createReducer<FormattedRow[]>(
  initialStocks,
  on(StockActions.addStock, (state, { stock }) => state.concat({ ...stock })),
  on(StockActions.addStockSuccess, (state, { stock }) => state.concat({ ...stock })),
  on(StockActions.addStockFail, (state, { error }) => error),
  on(StockActions.removeStockSuccess, (state, { symbol }) => state.filter(row => row.symbol !== symbol)),
  on(StockActions.removeAllRows, (state) => ({ ...state, baseRows: [] })),
);
