import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'workout-program-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['workout-program-form.component.scss'],
    template:  `
        <div class="workout-program-form">
            <form [formGroup]="form" novalidate>

                <div class="workout-program-form__row">
                    <div class="col-25">
                        <label>Program For</label>
                    </div>
                    <select formControlName="bodyType">
                        <option value="">Select</option>
                        <option *ngFor="let type of bodyType" [value]="type.key">{{ type.value }}</option>
                    </select>
                </div>

                <div class="workout-program-form__row">
                    <div class="col-25">
                        <label>Select Day Range</label>
                    </div>
                    <select formControlName="days">
                        <option value="">Select</option>
                        <option *ngFor="let day of days" [value]="day">{{ day }}</option>
                    </select>
                </div>


                <div class="workout-program-form__row">
                    <div class="col-25">
                        <label>Title</label>
                    </div>
                    <div class="col-75">
                        <input type="text" formControlName="title">
                    </div>
                </div>

                <div class="workout-program-form__row">
                    <div class="col-25">
                        <label>Description</label>
                    </div>
                    <div class="col-75">
                        <textarea formControlName="description"></textarea>
                    </div>
                </div>


                <div>
                    <div formArrayName="workouts">
                        <h1>Workout List</h1>
                        <div *ngFor="let workout of form.get('workouts').controls; let i=index">
                            <div [formGroupName]="i">
                                <div class="workout-program-form__row">
                                    <div class="col-25">
                                        <label>Workout Day</label>
                                    </div>
                                    <div class="col-75">
                                        <input type="text" formControlName="day">
                                    </div>
                                </div>

                                <div class="workout-program-form__row">
                                    <div class="col-25">
                                        <label>Workout Title</label>
                                    </div>
                                    <div class="col-75">
                                        <input type="text" formControlName="workoutTitle">
                                    </div>
                                </div>

                                <div class="workout-program-form__row">
                                    <button class="array" type="button" (click)="addWorkout()">+</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="workout-program-form__row">
                    <button class="button button--create" type="button" *ngIf="!exists" (click)="createInfo()">Create</button>
                    <button class="button button--create" type="button" *ngIf="exists" (click)="updateInfo()">Update</button>
                    <a class="button button--cancel" [routerLink]="['../list']">Cancel</a>
                </div>
            </form>
        </div>
    `
})

export class WorkoutProgramFormComponent implements OnChanges{
    form: FormGroup;
    @Input() doc;
    exists = false;

    days = ['1-2', '3-4', '5-6','7'];

    bodyType = [
        {key: 'weight-gain', value: 'Weight Gain'},
        {key: 'skinny-fat', value: 'Skinny Fat'},
        {key: 'getting-tone', value: 'Getting Tone'},
        {key: 'fat-loss', value: 'Weight Loss'}
    ];

    constructor(
        private fb: FormBuilder
    ){
        this.form = this.fb.group({
            title: ['', Validators.required],
            bodyType: ['', Validators.required],
            days: ['', Validators.required],
            description: ['', Validators.required],
            workouts: this.fb.array([
                this.createWorkouts()
            ])
        })
    }
    
    ngOnChanges(){
        if (this.doc && this.doc.title) {
            this.exists = true;
            this.emptyWorkoutList();

            const value = this.doc;
            this.form.patchValue(value);
            
            if (value.workouts) {
                for (const workout of value.workouts) {
                    this.workouts.push(this.reAddWorkouts(workout.day, workout.workoutTitle));
                }
            }
        }
    }

    createWorkouts() {
        return this.fb.group({
            day: [''],
            workoutTitle: ['']
        })
    }

    get workouts() {
        return this.form.get('workouts') as FormArray;
    }

    addWorkout(){    
        this.workouts.push(this.createWorkouts());
    }

    @Output() create = new EventEmitter<any>();
    createInfo(){
        this.create.emit(this.form.value);
    }

    @Output() update = new EventEmitter<any>();
    updateInfo(){
        this.update.emit(this.form.value);
    }

    emptyWorkoutList() {
        while(this.workouts.controls.length) {
          this.workouts.removeAt(0);
        }
    }

    reAddWorkouts(day, workout) {
        return this.fb.group({
            day: [day],
            workoutTitle: [workout]
        })
    }

}