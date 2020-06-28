import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StockDataService } from '../../services';
import * as StockActions from '../actions/stock.actions';
import { concatMap, map, catchError, tap } from 'rxjs/operators';
import { FormattedRow } from '../../models/formatted-row';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class StockEffects {

  addStock$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StockActions.addStock),
    concatMap((action) =>
      this.stockDataService.addStock(action.stock).pipe(
        map((stock: FormattedRow) => StockActions.addStockSuccess({ stock })),
        catchError((error: Error) => of(StockActions.addStockFail({ error }))),
      )
    )
  ));

  removeStock$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StockActions.removeStock),
    concatMap((action) =>
      this.stockDataService.removeStock(action.symbol).pipe(
        map((symbol: string) => StockActions.removeStockSuccess({ symbol })),
        catchError((error: Error) => of(StockActions.removeStockFail({ error }))),
      )
    )
  ));

  removeAllStocks$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StockActions.removeAllStocks),
    concatMap(() =>
      this.stockDataService.removeAllStocks().pipe(
        map(() => {
          console.log('removeAllStocksSuccess action dispatching');
          return StockActions.removeAllStocksSuccess();
        }),
        catchError((error: Error) => of(StockActions.removeAllStocksFail({ error }))),
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private stockDataService: StockDataService,
  ) {}
}
