import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    Hi
    <app-header></app-header>
    <meal-recipe></meal-recipe>
   
  `
})
export class AppComponent {
  title = 'fit';
}
