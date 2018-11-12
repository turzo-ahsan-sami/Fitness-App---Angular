import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="container">
      <app-header></app-header>
      <div class="content">
        <app-sidebar></app-sidebar>
        <main class="content-view">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class AppComponent {
  title = 'fit';

  constructor(
     
  ){}
}
