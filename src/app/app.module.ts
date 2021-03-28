import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClosingPricesComponent } from './closing-prices/closing-prices.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ChartsModule } from 'ng2-charts';
import { ComboComponent } from './combo/combo.component';
import { FiguresModule } from './figures/figures.module';


@NgModule({
  declarations: [
    AppComponent,
    ClosingPricesComponent,
    PortfolioComponent,
    ComboComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ChartsModule,
    FiguresModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
