import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRow, FormattedRow } from '../models';
import { MockBackendService } from './mock-backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  API_URL = 'API URL';

  constructor(private http: HttpClient, private mockBackendService: MockBackendService) { }

  addStock(stock: BaseRow): Observable<FormattedRow> {
    console.log('StockDataService');
    // return this.http.post<FormattedRow>(this.API_URL, stock);
    const formattedStock = this.mockBackendService.addStock(stock);
    return formattedStock;
  }

  removeStock(symbol: string): Observable<string> {
    console.log('StockDataService');
    // return this.http.delete<string>(this.API_URL, stock);
    const removedSymbol = this.mockBackendService.removeStock(symbol);
    return removedSymbol;
  }

  fetchStockPrice(symbols: string[]) {
    this.http.get(this.API_URL);
  }

  fetchDividends(symbols: string[]) {
    this.http.get(this.API_URL);
  }
}
