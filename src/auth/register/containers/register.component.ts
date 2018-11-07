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

    constructor(){}

    createUser(event: FormGroup){
        console.log(event);
    }  
}