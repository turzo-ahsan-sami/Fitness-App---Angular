import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
    selector: 'create-meal',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['create-meal.component.scss'],
    template: `
    
        <form [formGroup]="form">

            <div class="create-meal__row">
                <div class="col-25">
                    <label>Meal Title</label>
                </div>
                <div class="col-75">
                    <input type="text" formControlName="name">
                    <div class="error" *ngIf="form.get('name').hasError('required') && form.get('name').touched"> 
                        Required Field. 
                    </div>
                </div>
            </div>

            <div class="create-meal__row">
                <div class="col-25">
                    <label>Calorie amount</label>
                </div>
                <div class="col-75">
                    <input type="number" formControlName="calorie">
                    <div class="error" *ngIf="form.get('calorie').hasError('required') && form.get('calorie').touched"> 
                        Required Field. 
                    </div>
                </div>
            </div>

            <div class="create-meal__row">
                <button class="button button--create" type="button" [disabled]="form.invalid" (click)="dispatchMeal()">Create</button>
                <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
            </div>
        </form>
    `
})

export class CreateMealComponent{

    constructor(
        private fb: FormBuilder
    ){}

    form = this.fb.group({
        name: ['', Validators.required],
        calorie: ['', Validators.pattern('[0-9]+')]
    })

    @Input() type;

    @Output() meal = new EventEmitter<any>();
    dispatchMeal(){
        if(this.form.valid){
            this.meal.emit(
                { [this.type.type]: [this.form.value.name], ['calorie']: [this.form.value.calorie] }
            );
        }
    }
}