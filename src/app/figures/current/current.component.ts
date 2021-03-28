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
  //tickers: string[] = ['MMM', 'GOOG', 'AMD'];
  total_capital: string = '10000';
  //weights: number[] = [0.33, 0.33, 0.33];
  @Input() weights: any;
  old_weights: any;
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
    this.getPortfolio();
    this.old_weights = Object.assign({}, this.weights);
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

      // for (let line of this.lineChartData) {

      // }

      // for (let symbol in this.tickers) {
      //   // let label = line['label']|| 'total';
      //   for (let row of this.data) {
      //     for (let col in this.cols_wanted) {
      //       this.stock_data[symbol].push([])
      //     }



      //     if (col == 'open') {
      //       line.data?.push(row[symbol.concat('_open')]);
      //     } else if (label == 'close') {
      //       line.data?.push(row[symbol.concat('_close')]);
      //     } else {
      //       line.data?.push(row[label]);
      //     }

      //   }
      // }
    })
  }
}
