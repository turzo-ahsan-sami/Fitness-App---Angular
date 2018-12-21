import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
    selector: 'auth-form',
    styleUrls: ['auth-form.component.scss'],
    template: `
        <div class="form">
            <div class="auth-form">
                <form [formGroup]="form" (ngSubmit)="submitForm()">

                    <div class="logo"><ng-content select="p"></ng-content></div>

                    <label><input formControlName="email" type="email" placeholder="Email" /></label>
                    <label><input formControlName="password" type="password" placeholder="Password" /></label>

                    <div *ngIf="checkEmail" class="err">Please enter email</div>
                    <div *ngIf="checkPassword" class="err">Please enter password</div>
                    <ng-content class="err" select=".err"></ng-content>

                    <div class="auth-form__btn"><ng-content select="button"></ng-content></div> 
                    
                </form>
            </div>
        </div>
    `
})

export class AuthFormComponent{
    
    constructor(
        private fb: FormBuilder
    ){}

    form = this.fb.group({
        email: ['', Validators.required, Validators.pattern("[^ @]*@[^ @]*")],
        password: ['', Validators.required, Validators.minLength(8)]
    });

    @Output()
    submitted = new EventEmitter<FormGroup>();

    get checkEmail() {
        return this.form.get('email').hasError('required') && this.form.get('email').touched;
    }

    get checkPassword() {
        return this.form.get('password').hasError('required') && this.form.get('password').touched;
    }
    
    submitForm(){
        if(this.form.valid){
            this.submitted.emit(this.form);
        }
    }
}