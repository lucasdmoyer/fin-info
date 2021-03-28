
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ClosingPricesComponent } from './closing-prices/closing-prices.component';
import { ComboComponent } from './combo/combo.component';

const routes: Routes = [
  {
    path: 'prices',
    component: ClosingPricesComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'combo',
    component: ComboComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
