import { Action, createReducer, on } from '@ngrx/store';
import * as StockActions from '../actions/stock.actions';
import { BaseRow } from '../../models';

export interface State {
  baseRows: BaseRow[];
  rows: BaseRow[];
}

export const initialBaseRows: BaseRow[] = [];

export const baseRowsReducer = createReducer<BaseRow[]>(
  initialBaseRows,
  // on(StockActions.addRow, (state, { row }) => ({ ...state, baseRows: [...state.baseRows, row] })),
  on(StockActions.addRow, (state, { row }) => state.concat({ ...row })),
  // on(StockActions.editRow, (state, { row }) => ({ ...state, baseRows: [row, ...state.baseRows] })),
  // on(StockActions.removeRow, (state, { symbol }) => ({ ...state, baseRows: state.baseRows.filter(row => row.symbol !== symbol) })),
  on(StockActions.removeRow, (state, { symbol }) => state.filter(row => row.symbol !== symbol)),
  on(StockActions.removeAllRows, (state) => ({ ...state, baseRows: [] })),
);

// export function reducer(state: State | undefined, action: Action) {
//   return stockReducer(state, action);
// }

export const initialRows: BaseRow[] = [];

export const rowsReducer = createReducer<BaseRow[]>(
  initialRows,
  on(StockActions.addRow, (state, { row }) => state.concat({ ...row })),
  on(StockActions.removeRow, (state, { symbol }) => state.filter(row => row.symbol !== symbol)),
  on(StockActions.removeAllRows, (state) => ({ ...state, baseRows: [] })),
);
