import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { StocksStore } from './session.store';

@Injectable({ providedIn: 'root' })
export class StocksService {

  constructor(private stockStore: StocksStore, private http: HttpClient) {
    
  }
  
  test() {
    console.log('update');
    this.stockStore.update({ stocks: ['hi'] });
  }  

  update() {
    this.stockStore.update(state => ({
      test:'hello hi'
    }))
  }

}
