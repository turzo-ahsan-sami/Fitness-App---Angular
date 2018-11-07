import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from "@angular/core";

@Injectable()

export class AuthenticationService{
    constructor(private af: AngularFireAuth){}

    registerUser(email: string, password: string){
        return this.af.auth.createUserWithEmailAndPassword(email, password);
    }   

    loginUser(email: string, password: string){
        return this.af.auth.signInWithEmailAndPassword(email, password);
    }

    logoutUser(){
        return this.af.auth.signOut();
    }

}