import { AuthenticationService } from './../../shared/services/authentication.service';
import { FormGroup } from '@angular/forms';
import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'register',
    styleUrls: ['register.component.scss'],
    template: `
        <div>
            <auth-form (submitted)="createUser($event)">
                <p>Create Account</p>
                <button class="button" type="submit">Register</button>
                <div *ngIf="err" class="err">{{ err }}</div>
                <a class="link" routerLink="/secure/login">Already signed up?</a>
            </auth-form>
        </div>
    `
})

export class RegisterComponent{

    constructor(
        private as: AuthenticationService,
        private router: Router
    ){}

    err: string;

    async createUser(event: FormGroup){
        try{
            await this.as.registerUser(event.value.email, event.value.password);
            this.router.navigate(['user/info']);
        }catch(error){
            this.err = error.message;
        }
    }  
}