import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http: HttpClient) { }

  async fetchStockPrice(symbols: string[]): Promise<any> {
    // this.http.get();
  }

  async fetchDividends(symbols: string[]): Promise<any> {
    // this.http.get();
  }
}
