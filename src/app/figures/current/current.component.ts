import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ElementFinder } from 'protractor';
import { StockDataService } from '../../services/stock-data.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
  @Input() ticker: string = '';

  tickers: string[] = [''];
  weights: any = {
    weights: [0.333,0.333,0.333]
  }
  


  //@Input() initial_capital: string = '1000';
  initial_capital: string = '1000';
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Close',  yAxisID: 'y-axis-0' },
    { data: [], label: 'yhat', yAxisID: 'y-axis-0' },
    { data: [], label: 'simple_returns', yAxisID: 'y-axis-1' }
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
        },
        {
          id: 'y-axis-2',
          position: 'right',
        }
      ]
    }
  };

  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(173, 91, 255,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,34,76,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];



  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line' as const;

  data: any;
  graphData: any[] = [];

  constructor(private stockService: StockDataService) { }

  ngOnInit(): void {
    this.getCurrentPortfolio();
  }

    getCurrentPortfolio() {
      this.stockService.backtestPortfolio(this.initial_capital, this.weights).subscribe(raw => {
        
      })
    }
}
