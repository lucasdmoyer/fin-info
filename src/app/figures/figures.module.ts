import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleComponent } from './single/single.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrentComponent } from './current/current.component';
import { MarkowitzComponent } from './markowitz/markowitz.component';

@NgModule({
  declarations: [SingleComponent, CurrentComponent, MarkowitzComponent],
  imports: [
    CommonModule,
    ChartsModule,
    NgbModule
  ],
  exports: [
    SingleComponent,
    CurrentComponent,
    MarkowitzComponent
  ]

})
export class FiguresModule { }
