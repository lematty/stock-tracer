import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Stock } from '../stock.model';
import * as StockActions from '../actions/stock.actions';

export const stocksFeatureKey = 'stocks';

export interface StockState extends EntityState<Stock> {
  // additional entities state properties
  error: any;
}

export const adapter: EntityAdapter<Stock> = createEntityAdapter<Stock>({
  selectId: (stock) => stock.symbol,
});

export const initialState: StockState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
});


export const stockReducer = createReducer(
  initialState,
  on(StockActions.addStockSuccess,
    (state, action) => adapter.addOne(action.stock, state)
  ),
  on(StockActions.addStockFail,
    (state, action) => ({ ...state, error: action.error })
  ),
  on(StockActions.upsertStock,
    (state, action) => adapter.upsertOne(action.stock, state)
  ),
  on(StockActions.addStocks,
    (state, action) => adapter.addMany(action.stocks, state)
  ),
  on(StockActions.upsertStocks,
    (state, action) => adapter.upsertMany(action.stocks, state)
  ),
  on(StockActions.updateStock,
    (state, action) => adapter.updateOne(action.stock, state)
  ),
  on(StockActions.updateStocks,
    (state, action) => adapter.updateMany(action.stocks, state)
  ),
  on(StockActions.deleteStockSuccess,
    (state, action) => adapter.removeOne(action.symbol, state)
  ),
  on(StockActions.deleteStocksSuccess,
    (state, action) => adapter.removeMany(action.symbols, state)
  ),
  on(StockActions.loadStocks,
    (state, action) => adapter.setAll(action.stocks, state)
  ),
  on(StockActions.clearStocks,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
