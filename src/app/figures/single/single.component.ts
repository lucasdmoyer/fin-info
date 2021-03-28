import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ElementFinder } from 'protractor';
import { StockDataService } from '../../services/stock-data.service';

@Component({
  selector: 'app-single[ticker]',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  @Input() ticker: string = '';
  //@Input() initial_capital: string = '1000';
  initial_capital: string = '1000';
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'total',  yAxisID: 'y-axis-0' },
    { data: [], label: 'returns', yAxisID: 'y-axis-1' },
    { data: [], label: 'open', yAxisID: 'y-axis-2' },
    { data: [], label: 'close', yAxisID: 'y-axis-2' }
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
    this.getSingleStock();
  }

  getSingleStock() {
    this.stockService.getSingleStock(this.ticker, this.initial_capital).subscribe(raw => {
      this.data = raw;
      console.log(this.data);
    
      this.lineChartLabels = [];
      Object.keys(this.data).forEach(key => {
        this.lineChartLabels.push(this.data[key]['date']);
      });
      let symbol = this.ticker;
      for (let line of this.lineChartData) {
        let label = line['label']|| 'total';
        for (let row of this.data) {
          if (label == 'open') {
            line.data?.push(row[symbol.concat('_open')]);
          } else if (label == 'close') {
            line.data?.push(row[symbol.concat('_close')]);
          } else {
            line.data?.push(row[label]);
          }
          
        }
      }
      console.log(this.lineChartData);
    })

  }
}
