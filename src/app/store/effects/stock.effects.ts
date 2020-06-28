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

  deleteStock$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StockActions.deleteStock),
    concatMap((action) =>
      this.stockDataService.deleteStock(action.symbol).pipe(
        map((symbol: string) => StockActions.deleteStockSuccess({ symbol })),
        catchError((error: Error) => of(StockActions.deleteStockFail({ error }))),
      )
    )
  ));

  clearStocks$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StockActions.clearStocks),
    concatMap(() =>
      this.stockDataService.clearStocks().pipe(
        map(() => {
          console.log('clearStocks action dispatching');
          return StockActions.clearStocksSuccess();
        }),
        catchError((error: Error) => of(StockActions.clearStocksFail({ error }))),
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private stockDataService: StockDataService,
  ) {}
}