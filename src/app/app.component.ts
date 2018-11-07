import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    Hi
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'fit';

  constructor(
     
  ){}
}
