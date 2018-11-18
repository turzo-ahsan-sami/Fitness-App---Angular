import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
    selector: 'auth-form',
    styleUrls: ['auth-form.component.scss'],
    template: `
        <div class="form">
            <div class="auth-form">
                <form [formGroup]="form" (ngSubmit)="submitForm()">
                    <label><input formControlName="email" type="email" placeholder="Email" /></label>
                    <label><input formControlName="password" type="password" placeholder="Password" /></label>
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
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    @Output()
    submitted = new EventEmitter<FormGroup>();

    submitForm(){
        if(this.form.valid){
            this.submitted.emit(this.form);
        }
    }
}