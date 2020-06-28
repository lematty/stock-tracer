import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StockEffects } from './stock.effects';

describe('StockEffects', () => {
  let actions$: Observable<any>;
  let effects: StockEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StockEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(StockEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
