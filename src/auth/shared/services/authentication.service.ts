import { AppState } from './../../../app/app.state';
import { Store } from '@ngrx/store';
import { User } from './../models/auth.model';
import { tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from "@angular/core";

import * as userAction from './../store/actions/auth.action';
export type Action = userAction.AuthAction;

@Injectable()

export class AuthenticationService{
    constructor(
        private af: AngularFireAuth,
        private store: Store<AppState>){}

    auth$ = this.af.authState
    .pipe(tap(next => {
        if (!next) {
            this.store.dispatch(new userAction.NotAuthenticated());
            return;
        }
        else{
            const user: User = {
                uid: next.uid,
                displayName: 'Test',
                authenticated: true,
                email: next.email,
                loading: false,
                error: null,
            };
            console.log(user);
            this.store.dispatch(new userAction.Authenticated(user));
        }
    }));


    registerUser(email: string, password: string){
        return this.af.auth.createUserWithEmailAndPassword(email, password);
    }   

    loginUser(email: string, password: string){
        return this.af.auth.signInWithEmailAndPassword(email, password);
    }

    logoutUser(){
        return this.af.auth.signOut();
    }

    get loggedInUser(){
        return this.af.auth.currentUser;
    }

    get authState() {
        return this.af.authState;
    }
}