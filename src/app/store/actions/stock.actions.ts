import { createAction, props } from '@ngrx/store';
import { BaseRow, FormattedRow } from '../../models';

export const addStock = createAction('[Stock] add stock', props<{ stock: BaseRow }>());
export const addStockSuccess = createAction('[Stock] add stock success', props<{ stock: FormattedRow }>());
export const addStockFail = createAction('[Stock] add stock fail', props<{ error: any }>());

export const removeStock = createAction('[Stock] remove stock', props<{ symbol: string }>());
export const removeStockSuccess = createAction('[Stock] remove success', props<{ symbol: string }>());
export const removeStockFail = createAction('[Stock] remove fail', props<{ error: any }>());

export const removeAllStocks = createAction('[Stock] remove all stocks');
export const removeAllStocksSuccess = createAction('[Stock] remove all stocks success');
export const removeAllStocksFail = createAction('[Stock] remove all stocks fail', props<{ error: any }>());
