import { Component, OnInit, ViewChild } from '@angular/core';
import { StockDataService } from '../services/stock-data.service';
import { multi } from './data';
import { from } from 'rxjs';

@Component({
  selector: 'app-closing-prices',
  templateUrl: './closing-prices.component.html',
  styleUrls: ['./closing-prices.component.scss']
})
export class ClosingPricesComponent implements OnInit {
  data: any;
  tickers: string[] = ['AMD', 'GOOG', 'MMM']
  days_back: number = 365;
  graphData: any[] = [];

  multi: any;
  view: any = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  //public lineChartPlugins = [pluginAnnotations];

  // @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective | undefined;
  constructor(private stockService: StockDataService) {
    Object.assign(this, { multi });
  }

  ngOnInit(): void {
    this.graphData = multi;
    this.getPrices();
  }
  getPrices() {
    this.stockService.getStockData(this.tickers, this.days_back).subscribe(raw => {
      this.data = raw;
      this.graphData=[];
      console.log(this.data);
      for (let ticker of this.tickers) {
        console.log(ticker);

        let ticker_data: any = {
          "name": ticker,
          "series": []
        }
        Object.keys(this.data[ticker]).forEach(key => {
          console.info(this.data[ticker][key]);
          ticker_data['series'].push({
            "name": this.data[ticker][key]['Date'],
            "value": this.data[ticker][key]["Adj Close"]
          })
        });
        this.graphData.push(ticker_data);

      }
      console.log(this.graphData);
    })
  }

  onSelect(dat: string): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(dat)));
  }

  onActivate(dat: string): void {
    console.log('Activate', JSON.parse(JSON.stringify(dat)));
  }

  onDeactivate(dat: string): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(dat)));
  }


}
