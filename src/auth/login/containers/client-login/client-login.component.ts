import { AuthenticationService } from './../../../shared/services/authentication.service';
import { FormGroup } from '@angular/forms';
import { Component } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
    selector: 'client-login',
    template: `
        <div *ngIf="afAuth.user | async as user">Login Successful{{ user.email }}</div>
        <button (click)="userLogout()">Logout</button>
        <auth-form (submitted)="userLogin($event)">
            <p>Login</p>
            <button type="submit">Login</button>
        </auth-form>
    `
})

export class ClientLoginComponent{
    constructor(
        public as: AuthenticationService,
        public afAuth: AngularFireAuth){}

    async userLogin(event: FormGroup){
        await this.as.loginUser(event.value.email, event.value.password);
        try{
            console.log('Logged in success');
        }catch(err){
            console.log(err);
        }
        
    }

    //testing
    async userLogout(){
        await this.as.logoutUser();
        console.log('Logout');
    }
}