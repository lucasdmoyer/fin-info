import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fin-info';
  active = 1;
  links = [
    { title: 'Home', fragment: 'one',link:"." },
    { title: 'Prices', fragment: 'two',link:'./prices' },
    { title: 'Portfolio', fragment: 'three', link:'./portfolio'},
    { title: 'Combo', fragment: 'four', link:'./combo'}
  ];
  constructor(public route: ActivatedRoute) {}
  
}
