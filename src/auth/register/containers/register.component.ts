import { AuthenticationService } from './../../shared/services/authentication.service';
import { FormGroup } from '@angular/forms';
import { Component } from "@angular/core";

@Component({
    selector: 'register',
    template: `
        <div>
            <auth-form (submitted)="createUser($event)">
                <p>Create Account</p>
                <button type="submit">Register</button>
            </auth-form>
        </div>
    `
})

export class RegisterComponent{

    constructor(
        private as: AuthenticationService
    ){}

    async createUser(event: FormGroup){
        await this.as.registerUser(event.value.email, event.value.password);
    }  
}