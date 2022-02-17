import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { StocksStore, StockState } from './session.store';

@Injectable({ providedIn: 'root' })
export class StocksQuery extends Query<StockState> {

  constructor(protected store: StocksStore) {
    super(store);
  }

}
