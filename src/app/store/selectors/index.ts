import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectStocks = (state: AppState) => state.table.stocks;
export const selectSelectedStocks = (state: AppState) => state.selections.selectedStocks;
