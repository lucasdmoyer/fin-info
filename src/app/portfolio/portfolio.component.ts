import { Component, OnInit } from '@angular/core';
import { StockDataService } from '../services/stock-data.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  //tickers: string[] = ['MMM', 'GOOG', 'AMD'];
  total_capital: string = '10000';
  //weights: number[] = [0.33, 0.33, 0.33];
  weights: any = {
    'weights': {
      'MMM': 0.33,
      'GOOG': 0.33,
      'AMD': 0.33
    }
  }

  new_weights: any = {};

  ngOnInit(): void {
    //this.new_weights = this.weights;
    this.new_weights['weights'] = {};
    for (let key in this.weights['weights']) {
      let value = this.weights['weights'][key];
      this.new_weights.weights[key] = value;
    }

  }



}
