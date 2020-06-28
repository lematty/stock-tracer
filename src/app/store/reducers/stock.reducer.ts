import { createReducer, on } from '@ngrx/store';
import * as StockActions from '../actions/stock.actions';
import { FormattedRow } from '../../models';

export interface StockState {
  stocks: FormattedRow[];
  error: any;
}

export const initialStocksState: StockState = {
  stocks: [],
  error: undefined,
};

export const stocksReducer = createReducer<StockState>(
  initialStocksState,
  // on(StockActions.addStockSuccess, (state, { stock }) => state.concat({ ...stock })),
  // on(StockActions.removeStockSuccess, (state, { symbol }) => state.filter((stock) => stock.symbol !== symbol)),

  on(StockActions.addStockSuccess, (state, { stock }) => ({ ...state, stocks: [...state.stocks, stock] })),
  on(StockActions.addStockFail, (state, error) => ({ ...state, error })),

  on(StockActions.removeStockSuccess, (state, { symbol }) => {
    const stocks = state.stocks.filter((stock) => stock.symbol !== symbol);
    return { ...state, stocks };
  }),
  on(StockActions.removeStockFail, (state, error) => ({ ...state, error })),

  on(StockActions.removeAllStocksSuccess, (state) => ({ ...state, stocks: [] })),
  on(StockActions.removeAllStocksFail, (state, error) => ({ ...state, error })),
);


// export function reducer(state: State | undefined, action: Action) {
//   return stocksReducer(state, action);
// }
