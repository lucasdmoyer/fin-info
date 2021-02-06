import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ClosingPricesComponent } from './closing-prices/closing-prices.component';

const routes: Routes = [
  {
    path: 'prices',
    component: ClosingPricesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
