import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http: HttpClient) { }


  getStockData(tickers: string[], days_back: number) {
    return this.http.get(environment.apiUrl + "/getStocks?ticker_data=AMD%2CGOOG%2CMMM&initial_captial=100000")
  }

  getPortfolio(tickers: string[], initial_capital: string) {
    return this.http.get(environment.apiUrl + `/backtestStrategy?ticker_data=AMD%2CGOOG%2CMMM&initial_captial=${initial_capital}`)
  }

  getSingleStock(ticker: string, initial_capital: string) {
    return this.http.get(environment.apiUrl + `/backtestSingleStock?ticker=${ticker}&initial_captial=${initial_capital}`)
  }

  backtestPortfolio(initial_capital: string, weights: any) {
    const body = weights
    return this.http.post(environment.apiUrl + `/backtestPortfolio?&initial_captial=${initial_capital}`, body)
  }

  //markowitz-optimize-portfolio?markov_runs=1000&MSR_or_GMV=MSR&ticker_data=AMD%2CGOOG%2CMMM
  optimizeWeights(tickers: string[]) {
    const body = {};
    return this.http.post<any>(environment.apiUrl + `/markowitz-optimize-portfolio?markov_runs=1000&MSR_or_GMV=MSR&ticker_data=${tickers.join('%2C')}`, body)
  }
}
