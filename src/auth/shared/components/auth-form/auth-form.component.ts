import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
    selector: 'auth-form',
    template: `
        <form [formGroup]="form" (ngSubmit)="submitForm()">
            <input formControlName="email" type="email" />
            <input formControlName="password" type="password" />
            <ng-content select="button"></ng-content>
        </form>
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