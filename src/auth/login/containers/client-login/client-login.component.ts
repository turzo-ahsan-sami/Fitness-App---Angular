import { Router } from '@angular/router';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { FormGroup } from '@angular/forms';
import { Component } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
    selector: 'client-login',
    styleUrls: ['client-login.component.scss'],
    template: `
        <auth-form (submitted)="userLogin($event)">
            <p>Login</p>
            <button type="submit">Login</button>
            <div *ngIf="err" class="err">{{ err }}</div>
            <a class="link" routerLink="/secure/register">Haven't signed up?</a>
        </auth-form>
    `
})

export class ClientLoginComponent{
    constructor(
        public as: AuthenticationService,
        private router: Router){}
    
    err: string;

    async userLogin(event: FormGroup){ 
        try{
            await this.as.loginUser(event.value.email, event.value.password);
            this.router.navigate(['/user/schedule-plan']);
        }catch(error){
            this.err = error.message;
        }
        
    }

    //testing
    async userLogout(){
        await this.as.logoutUser();
        console.log('Logout');
    }
}