import { Validators, FormBuilder } from '@angular/forms';
import { Component, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";


@Component({
    selector: 'create-workout',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['create-workout.component.scss'],
    template: `
        <form [formGroup]="form">
            <div class="create-workout__row">
                <div class="col-25">
                    <label>Workout Title</label>
                </div>
                <div class="col-75">
                    <input type="text" formControlName="name">
                    <div class="error" *ngIf="form.get('name').hasError('required') && form.get('name').touched"> 
                        Required Field. 
                    </div>
                </div>
            </div>

            <div class="create-workout__row">
                <div class="col-25">
                    <label>Select Workout Type</label>
                </div>
                <div class="col-75">
                    <workout-type formControlName="type"></workout-type>
                    <div class="error" *ngIf="form.get('type').hasError('required') && form.get('type').touched"> 
                        Required Field. 
                    </div>
                </div>
            </div>


            <div class="create-workout__row" *ngIf="form.get('type').value === 'cardio'">
                <div formGroupName="cardio">  
                    <div class="create-workout__row">
                        <div class="col-25">          
                            <label>Distance <span>in km</span></label>
                        </div>
                        <div class="col-75">
                            <input formControlName="distance" type="number"/>
                        </div>

                        <div class="col-25">
                            <label>Duration <span>in minutes</span></label>
                        </div>
                        <div class="col-75">
                            <input formControlName="duration" type="number"/>
                        </div>
                    </div>

                    <div class="create-workout__row">
                        <div class="col-25">
                            <label>Est Calories Burned</label>
                        </div>
                        <div class="col-75">
                            <input type="number" formControlName="calorie">
                            {{ calorie }}
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="create-workout__row" *ngIf="form.get('type').value === 'weight'">
                <div formGroupName="weight">
                    <div class="create-workout__row">
                        <div class="col-25">
                            <label>Number of Sets</label>
                        </div>
                        <div class="col-75">
                            <input formControlName="sets" type="number"/>
                        </div>
                    </div>

                    <div class="create-workout__row">
                        <div class="col-25">
                            <label>Number of Reps</label>
                        </div>
                        <div class="col-75">
                            <input formControlName="reps" type="number"/>
                        </div>
                    </div>
                
                    <div class="create-workout__row">
                        <div class="col-25">
                            <label>Weight</label>
                        </div>
                        <div class="col-75">
                            <input formControlName="weight" type="number"/>
                        </div>
                    </div>

                    <div class="create-workout__row">
                        <div class="col-25">
                            <label>Intensity Value</label>
                        </div>
                        <div class="col-75">
                            <select formControlName="intensityValue">
                                <option value="">Select</option>
                                <option *ngFor="let type of intensityTypes" [value]="type.value">{{ type.name }}</option>
                            </select>
                        </div>
                    </div>
            
                    <div class="create-workout__row">
                        <div class="col-25">
                            <label>Duration <span>min</span></label>
                        </div>
                        <div class="col-75">
                            <input type="number" formControlName="duration" >
                        </div>
                   </div>

                   <div class="create-workout__row">
                        <div class="col-25">
                            <label>Est Calories Burned</label>
                        </div>
                        <div class="col-75">
                            <input type="number" [value]="form.get('weight').get('duration').value * form.get('weight').get('intensityValue').value" formControlName="calorie">
                            {{ calorie }}
                        </div>
                    </div>
        
                </div>
            </div>

            <div class="create-workout__row">
                <button class="button button--create" type="button" [disabled]="form.invalid" (click)="dispatchWorkout()">Create</button>
                <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
            </div>
        </form>
    `
})

export class CreateWorkoutComponent{

    constructor(
        private fb: FormBuilder
    ){}

    numberPatern = '^[0-9.,]+$';

    intensityTypes = [ // value in calories
        { id: 'free-weights', name: 'Strength training with free weights ', value: 0.039 },
        { id: 'lighter-weights', name: 'Lighter weights with moderate efforts', value: 0.028 },
        { id: 'circuit-training', name: 'Circuit training', value: 0.042 },
        { id: 'body-building-level', name: 'Body building level effort', value: 0.055}
    ];

    form = this.fb.group({
        name: ['', Validators.required],
        type: 'cardio',
        cardio: this.fb.group({ 
            duration: 0, 
            distance: 0,
            calorie: [0, [Validators.required, Validators.pattern(this.numberPatern)]],
        }), 
        weight: this.fb.group({ 
            weight: 0, 
            reps: 0, 
            sets: 0, 
            duration: [ 0, [Validators.required, Validators.pattern(this.numberPatern)]], 
            intensityValue: [ 0, Validators.required],
            calorie: [0, [Validators.required, Validators.pattern(this.numberPatern)]],
        }),
    })

    @Output() workout = new EventEmitter<any>();
    dispatchWorkout(){
        if(this.form.valid){
            this.workout.emit({ ['Workout']: [this.form.value] });
        }
    }

        
}

