import { Action, createReducer, on } from '@ngrx/store';
import * as ImportActions from '../actions/import.actions';
import { BaseRow } from '../../models';

export interface State {
  importHeaders: string[];
  importRows: string[];
  baseData: BaseRow[];
  rawImportData: any[];
}

export const initialState: State = {
  importHeaders: [],
  importRows: [],
  baseData: [],
  rawImportData: [],
};

const importReducer = createReducer(
  initialState,
  on(ImportActions.rawImportData, (state, { data }) => ({ ...state, rawImportData: data })),
  on(ImportActions.importHeaders, (state, { headers }) => ({ ...state, importHeaders: headers })),
  on(ImportActions.importRows, (state, { rows }) => ({ ...state, importRows: rows })),
);

export function reducer(state: State | undefined, action: Action) {
  return importReducer(state, action);
}
