import { FormGroup } from '@angular/forms';
import { Component } from "@angular/core";

@Component({
    selector: 'client-login',
    template: `
        <auth-form (submitted)="userLogin($event)">
            <p>Login</p>
            <button type="submit">Login</button>
        </auth-form>
    `
})

export class ClientLoginComponent{
    constructor(){}

    userLogin(event: FormGroup){
        console.log(event);
    }
}