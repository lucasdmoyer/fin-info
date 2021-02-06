import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http: HttpClient) { }


  getStockData(tickers: string[], days_back: number) {
    return this.http.get(environment.apiUrl + "/getStocks?ticker_data=MSFT%2CTSLA%2CAAPL%2CT&days_back=365")
  }
}
