import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
// import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { StockDataService } from '../services/stock-data.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss']
})
export class ComboComponent implements OnInit {
  initial_capital = '2000'
  // lineChartData: ChartDataSets[] = [
  //   {
  //     data: [],
  //     label: '',
  //     yAxisID: 'y-axis-0'
  //   },
  // ];

  // lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'total',  yAxisID: 'y-axis-0' },
    { data: [], label: 'returns', yAxisID: 'y-axis-1' },
    { data: [], label: 'holdings', yAxisID: 'y-axis-2' },
    { data: [], label: 'cash', yAxisID: 'y-axis-2' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}],
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

  // public chartColors: Color[] = [
  //   { backgroundColor: '#4AEC4A' },
  //   { backgroundColor: '#434a54' },
  //   { backgroundColor: '#3ebf9b' },
  //   { backgroundColor: '#4d86dc' }
  // ]

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
      backgroundColor: 'rgba(255,0,0,0.3)',
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
  tickers: string[] = ['AMD', 'GOOG', 'MMM']
  days_back: number = 365;
  graphData: any[] = [];


  constructor(private stockService: StockDataService) { }

  ngOnInit(): void {
    this.getPortfolio();

  }

  getPortfolio() {
    this.stockService.getPortfolio(this.tickers, this.initial_capital).subscribe(raw => {
      this.data = raw;
      console.log(this.data);
      //this.lineChartData = [];

      // get date and set to labels
      this.lineChartLabels = [];
      Object.keys(this.data).forEach(key => {
        this.lineChartLabels.push(this.data[key]['date']);
      });

      for (let line of this.lineChartData) {
        let label = line['label']|| 'total';
        for (let row of this.data) {
          line.data?.push(row[label]);
        }
      }
    })
    console.log(this.lineChartData);

  }
}
