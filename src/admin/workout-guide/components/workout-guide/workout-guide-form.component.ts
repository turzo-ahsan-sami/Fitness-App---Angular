import { Component, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormControl, FormBuilder, Validators } from '@angular/forms'; 

@Component({
    selector: 'workout-guide-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['workout-guide-form.component.scss'],
    template: `
        <div class="workout-guide-form">
            <form [formGroup]="form">
                <div class="workout-guide-form__row">
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

                <div class="workout-guide-form__row">
                    <div class="col-25">
                        <label>Instructions</label>
                    </div>
                    <div formArrayName="instructions" class="col-75">
                        <label *ngFor="let instruction of instructions.controls; index as i;">
                            <input type="text" class="instructions" [formControlName]="i">
                        </label>
                        <button class="array" type="button" (click)="addInstructions()">+</button>
                    </div>
                </div>

                <div class="workout-guide-form__row">
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

                <div class="workout-guide-form__row" *ngIf="form.get('type').value === 'cardio'">
                    <div formGroupName="cardio">  
                        <div class="col-25">          
                            <label>Distance <span>in km</span></label>
                        </div>
                        <div class="col-type-set">
                            <input formControlName="distance" type="number"/>
                        </div>

                        <div class="col-25">
                            <label>Duration <span>in minutes</span></label>
                        </div>
                        <div class="col-type-set">
                            <input formControlName="duration" type="number"/>
                        </div>
                    </div>
                </div>
            
                <div class="workout-guide-form__row" *ngIf="form.get('type').value === 'weight'">
                    <div formGroupName="weight">
                        <div class="col-25">
                            <label>Number of Sets</label>
                        </div>
                        <div class="col-type-set">
                            <input formControlName="sets" type="number"/>
                        </div>
                    
                        <div class="col-25">
                            <label>Number of Reps</label>
                        </div>
                        <div class="col-type-set">
                            <input formControlName="reps" type="number"/>
                        </div>
                    
                        <div class="col-25">
                            <label>Weight</label>
                        </div>
                        <div class="col-type-set">
                            <input formControlName="weight" type="number"/>
                        </div>
                    </div>
                </div>

                <div class="workout-guide-form__row">
                    <div class="col-25">
                        <label>Est Calories Burned</label>
                    </div>
                    <div class="col-75">
                        <input type="number" formControlName="calorieBurned">
                    </div>
                    <div class="error" *ngIf="form.get('name').hasError('required') && form.get('name').touched"> 
                        Required Field. 
                    </div>
                </div>

                <div class="workout-guide-form__row">
                    <button class="button button--create" type="button" [disabled]="form.invalid" (click)="dispatchWorkout()">
                        Create 
                    </button>
                    <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
                </div>

            </form>
        </div>
    `
})

export class WorkoutGuideFormComponent implements OnChanges{
    constructor(private fb: FormBuilder) {}

    form = this.fb.group({
        name: ['', Validators.required],
        type: 'cardio',
        cardio: this.fb.group({ duration: 0 , distance: 0 }),
        weight: this.fb.group({ weight: 0, reps: 0, sets: 0 }),
        instructions: this.fb.array(['']),
        calorieBurned: ['', Validators.required]
    });

    ngOnChanges(){

    }
    

    get instructions() {
        return this.form.get('instructions') as FormArray;
    }

    addInstructions() {
        this.instructions.push(new FormControl(''));
    }

    @Output()
    create = new EventEmitter<any>();

    dispatchWorkout(){
        this.create.emit(this.form.value);
    }

}