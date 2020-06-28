import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRow, FormattedRow } from '../models';
import { MockBackendService } from './mock-backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  API_URL = '../../assets/mock-database.json';

  constructor(private http: HttpClient, private mockBackendService: MockBackendService) { }

  getStocks(): Observable<FormattedRow[]> {
    const response = this.http.get<FormattedRow[]>(this.API_URL);
    return response;
  }

  addStock(stock: BaseRow): Observable<FormattedRow> {
    // const response = this.http.post<FormattedRow>(this.API_URL, stock);
    const formattedStock = this.mockBackendService.addStock(stock);
    return formattedStock;
  }

  removeStock(symbol: string): Observable<string> {
    // return this.http.delete<string>(this.API_URL, stock);
    const removedSymbol = this.mockBackendService.removeStock(symbol);
    return removedSymbol;
  }

  removeAllStocks(): Observable<void> {
    // return this.http.delete<string>(this.API_URL, stock);
    return this.mockBackendService.removeAllStocks();
  }
}
