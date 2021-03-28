import { Component, OnInit, Input } from '@angular/core';
import { StockDataService } from '../../services/stock-data.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-markowitz',
  templateUrl: './markowitz.component.html',
  styleUrls: ['./markowitz.component.scss']
})
export class MarkowitzComponent implements OnInit {

  //tickers: string[] = ['MMM', 'GOOG', 'AMD'];
  tickers: string[] = [];
  total_capital: string = '10000';
  showProgress = true;
  // weights: any = {
  //   'weights': {
  //     'MMM': 0.33,
  //     'GOOG':0.33,
  //     'AMD':0.33
  //   }
  // }
  @Input() weights?: any;
  new_weights: any = {};
  data: any;
  stock_data: any = [];
  constructor(private stockService: StockDataService) {
  }

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'total', yAxisID: 'y-axis-0' },
    { data: [], label: 'forecasted_total', yAxisID: 'y-axis-0' },
    { data: [], label: 'upper_total', yAxisID: 'y-axis-0' },
    { data: [], label: 'lower_total', yAxisID: 'y-axis-0' },
    // { data: [], label: 'returns', yAxisID: 'y-axis-1' },
    // { data: [], label: 'forecasted_returns', yAxisID: 'y-axis-1' },
    // { data: [], label: 'upper_returns', yAxisID: 'y-axis-1' },
    // { data: [], label: 'lower_returns', yAxisID: 'y-axis-1' },

  ];

  lineChartLabels: Label[] = [];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line' as const;
  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'Portfolio Value'
          },
          ticks: {
            max : 10200,
            min: 10050
          }
        },
        // {
        //   id: 'y-axis-1',
        //   position: 'right',
        //   scaleLabel: {
        //     display: true,
        //     labelString: 'Returns'
        //   }
        // },
        // {
        //   id: 'y-axis-2',
        //   position: 'right',
        //   scaleLabel: {
        //     display: true,
        //     labelString: 'Upper/Lower Value'
        //   }
        // }
      ]
    }
  };

  public lineChartColors: Color[] = [
    { // dark green for total
      backgroundColor: 'rgba(162, 199, 155,0.3)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // forecasted light green
      backgroundColor: 'rgba(77, 247, 159,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // green for upper total
      backgroundColor: 'rgba(64, 235, 52,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red for lower total
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark green for total
      backgroundColor: 'rgba(162, 199, 155,0.3)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // forecasted light green
      backgroundColor: 'rgba(77, 247, 159,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // green for upper total
      backgroundColor: 'rgba(64, 235, 52,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red for lower total
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  ngOnInit(): void {
    //this.getPortfolio();
    console.log(this.weights);
    this.getOptimizedWeights();
  }

  getOptimizedWeights() {
    this.showProgress = true
    this.tickers = Object.keys(this.weights.weights);
    this.stockService.optimizeWeights(this.tickers).subscribe(res => {
      //this.weights.weights = {};
      for (let key in res['weights']) {

        let value = res['weights'][key];
        this.weights.weights[key] = value;
        
      }
      console.log(this.weights);

      this.getPortfolio();
      
    })
  }

  getPortfolio() {
    this.stockService.backtestPortfolio(this.total_capital, this.weights).subscribe(raw => {
      this.data = raw;
      console.log(raw);
      this.lineChartLabels = [];
      Object.keys(this.data).forEach(key => {
        let date = this.data[key]['date'].substring(0, 10);
        this.lineChartLabels.push(date);
      });

      for (let line of this.lineChartData) {
        let label = line['label'] || 'total';
        for (let row of this.data) {
          line.data?.push(row[label]);
        }
      }
      this.showProgress = false;
    })
  }

}
