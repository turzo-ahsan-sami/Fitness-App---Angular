// import { map, switchMap, delay, catchError } from 'rxjs/operators';
// import * as userAction from './../actions/auth.action';
// import { User } from './../../models/auth.model';
// import { Injectable } from '@angular/core';
// import { Effect, Actions } from '@ngrx/effects';
// import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase';

// import { Observable, of }  from 'rxjs';
// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/observable/of';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/delay';


// export type Action = userAction.AuthAction;


// @Injectable()
// export class UserEffects {

//     constructor(private actions: Actions, private afAuth: AngularFireAuth) {}

//     @Effect()
//     getUser:  Observable<any> = this.actions.ofType(userAction.GET_USER)
//         .pipe(
//         map((action: userAction.GetUser) => action.payload ),
//         switchMap(payload => this.afAuth.authState ),
//         delay(2000),
//         map( authData => {
//             if (authData) {
//                 const user = new User(authData.uid, authData.displayName);
//                 console.log(user + 'heyo')
//                 return new userAction.Authenticated(user);
                
//             } else {
//                 return new userAction.NotAuthenticated();
//             }

//         }),
//         catchError(err => of(new userAction.AuthError())));
    
// }