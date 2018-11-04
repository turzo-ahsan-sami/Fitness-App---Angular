import { Component, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormControl, FormBuilder, Validators } from '@angular/forms'; 

@Component({
    selector: 'workout-guide-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <form [formGroup]="form">
            <input type="text" formControlName="name">

            <label>
                Type
                <workout-type formControlName="type"></workout-type>
            </label>

            <div *ngIf="form.get('type').value === 'cardio'">
                <div formGroupName="cardio">
                    
                    <h3>Distance <span>in km</span></h3>
                    <input formControlName="distance" type="number"/>
                
                    <h3>Duration <span>in minutes</span></h3>
                    <input formControlName="duration" type="number"/>
                   
                </div>
            </div>
          
            <div *ngIf="form.get('type').value === 'weight'">
                <div formGroupName="weight">
                   
                    <h4>Sets</h4>
                    <input formControlName="sets" type="number"/>
                   
                    <h4>Reps</h4>
                    <input formControlName="reps" type="number"/>
                
                    <h4>Weight <span>in lbs</span></h4>
                    <input formControlName="weight" type="number"/>
                   
                </div>
            </div>

            <button class="button" type="button" (click)="dispatchWorkout()">
                Create 
            </button>
        </form>
    `
})

export class WorkoutGuideFormComponent implements OnChanges{
    constructor(private fb: FormBuilder) {}

    form = this.fb.group({
        name: ['', Validators.required],
        type: 'cardio',
        cardio: this.fb.group({ duration: 0 , distance: 0 }),
        weight: this.fb.group({ weight: 0, reps: 0, sets: 0 }),
        instructions: this.fb.array([''])
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