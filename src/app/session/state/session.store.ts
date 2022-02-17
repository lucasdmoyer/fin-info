import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface StockState {
  stocks: any[],
  test: string
}

export function createInitialState(): StockState {
 return {
   stocks: [],
   test: 'test'
 };
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'stocks' })
export class StocksStore extends Store<StockState> {

  constructor() {
    super(createInitialState());
  }

}
