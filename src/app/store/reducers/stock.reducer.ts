import { Action, createReducer, on } from '@ngrx/store';
import * as StockActions from '../actions/stock.actions';
import { BaseRow } from '../../models';

export interface State {
  baseRows: BaseRow[];
}

export const initialState: State = {
  baseRows: [],
};

const stockReducer = createReducer(
  initialState,
  on(StockActions.addRow, (state, { row }) => ({ ...state, baseRows: [...state.baseRows, row] })),
  on(StockActions.editRow, (state, { row }) => ({ ...state, baseRows: [row, ...state.baseRows] })),
  on(StockActions.removeRow, (state, { symbol }) => ({ ...state, baseRows: state.baseRows.filter(row => row.symbol !== symbol) })),
  on(StockActions.removeAllRows, (state) => ({ ...state, baseRows: [] })),
);

export function reducer(state: State | undefined, action: Action) {
  return stockReducer(state, action);
}
