import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StockDataService } from '../../services';
import { addStock, addStockFail, addStockSuccess } from '../actions/stock.actions';
import { concatMap, map, catchError, tap } from 'rxjs/operators';
import { FormattedRow } from '../../models/formatted-row';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class StockEffects {

  addStock$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(addStock),
    concatMap((action) =>
      this.stockDataService.addStock(action.stock).pipe(
        map((stock: FormattedRow) => addStockSuccess({ stock })),
        catchError((error: Error) => of(addStockFail( { error }))),
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private stockDataService: StockDataService,
  ) {}
}
