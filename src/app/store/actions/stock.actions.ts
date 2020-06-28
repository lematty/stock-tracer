import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Stock } from '../stock.model';
import { BaseRow } from '../../models';
import { FormattedRow } from '../../models/formatted-row';

export const loadStocks = createAction(
  '[Stock/API] Load Stocks', 
  props<{ stocks: Stock[] }>()
);

export const addStock = createAction(
  '[Stock/API] Add Stock',
  props<{ stock: BaseRow }>()
);

export const addStockSuccess = createAction(
  '[Stock/API] Add Stock success',
  props<{ stock: Stock }>()
);

export const addStockFail = createAction(
  '[Stock/API] Add Stock fail',
  props<{ error: any }>()
);

export const upsertStock = createAction(
  '[Stock/API] Upsert Stock',
  props<{ stock: Stock }>()
);

export const addStocks = createAction(
  '[Stock/API] Add Stocks',
  props<{ stocks: BaseRow[] }>()
);

export const upsertStocks = createAction(
  '[Stock/API] Upsert Stocks',
  props<{ stocks: Stock[] }>()
);

export const updateStock = createAction(
  '[Stock/API] Update Stock',
  props<{ stock: Update<Stock> }>()
);

export const updateStocks = createAction(
  '[Stock/API] Update Stocks',
  props<{ stocks: Update<Stock>[] }>()
);

export const deleteStock = createAction(
  '[Stock/API] Delete Stock',
  props<{ symbol: string }>()
);

export const deleteStockSuccess = createAction(
  '[Stock/API] Delete Stock success',
  props<{ symbol: string }>()
);

export const deleteStockFail = createAction(
  '[Stock/API] Delete Stock fail',
  props<{ error: any }>()
);

export const deleteStocks = createAction(
  '[Stock/API] Delete Stocks',
  props<{ symbols: string[] }>()
);

export const deleteStocksSuccess = createAction(
  '[Stock/API] Delete Stocks success',
  props<{ symbols: string[] }>()
);

export const deleteStocksFail = createAction(
  '[Stock/API] Delete Stocks',
  props<{ error: any }>()
);

export const clearStocks = createAction(
  '[Stock/API] Clear Stocks'
);

export const clearStocksSuccess = createAction(
  '[Stock/API] Clear Stocks'
);

export const clearStocksFail = createAction(
  '[Stock/API] Clear Stocks',
  props<{ error: any }>()
);
