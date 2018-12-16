import { Router } from '@angular/router';
import * as authActions from './../auth/shared/store/actions/auth.action';
import { User } from './../auth/shared/models/auth.model';
import { AppState } from './app.state';
import { Subscription, Observable } from 'rxjs';
import { AuthenticationService } from 'src/auth/shared/services/authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="container">
        <app-header *ngIf="(user$ | async)?.uid !== null" (logOutUser)="signOut()"></app-header>
        <div class="content">
            <admin-sidebar *ngIf="(user$ | async)?.uid == '5I8TTANA98Zt4SPo4gKi1J2tdru1'; else clientPanel;"></admin-sidebar>
            <ng-template #clientPanel>
              <app-sidebar *ngIf="(user$ | async)?.uid !== null"></app-sidebar>
            </ng-template>
            <main class="content-view">
                <div class="overview">
                    <router-outlet></router-outlet>
                </div>
            </main>
        </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'fit';
  subscription: Subscription;

  

  constructor(
    private as: AuthenticationService,
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthenticationService
  ){}

  user$: Observable<User>;
    
  ngOnInit(){
    this.subscription = this.as.auth$.subscribe();
    this.user$ = this.store.select('user');
    //this.store.dispatch(new authActions.GetUser());
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  async signOut() {
    await this.authService.logoutUser();
    this.router.navigate(['/secure/login']);
  }
}
