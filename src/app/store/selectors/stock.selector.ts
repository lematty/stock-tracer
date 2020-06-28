import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StockState, stocksFeatureKey, selectAll } from '../reducers/stock.reducer';

export const selectStoreState = createFeatureSelector<StockState>(stocksFeatureKey);


export const selectStocks = createSelector(selectStoreState, selectAll);

