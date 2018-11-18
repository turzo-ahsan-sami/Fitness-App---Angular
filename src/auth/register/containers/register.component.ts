import { AuthenticationService } from './../../shared/services/authentication.service';
import { FormGroup } from '@angular/forms';
import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'register',
    template: `
        <div>
            <auth-form (submitted)="createUser($event)">
                <p>Create Account</p>
                <button class="button" type="submit">Register</button>
            </auth-form>
        </div>
    `
})

export class RegisterComponent{

    constructor(
        private as: AuthenticationService,
        private router: Router
    ){}

    async createUser(event: FormGroup){
        await this.as.registerUser(event.value.email, event.value.password);
        this.router.navigate(['user/info']);
    }  
}