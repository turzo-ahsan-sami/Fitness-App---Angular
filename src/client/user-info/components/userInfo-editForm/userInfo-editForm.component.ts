import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Output, OnInit, Input } from "@angular/core";
import { EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'userInfo-editForm',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['userInfo-editForm.component.scss'],
    template: `
        <div class="userInfo-editForm">
            <form [formGroup]="form">

                <div class="userInfo-editForm__row">
                    <div class="col-25">
                        <label>How often do you exercise?</label>
                    </div>
                    <div class="col-75">
                        <select formControlName="exerciseDaysAWeek">
                            <option value="">Select</option>
                            <option *ngFor="let day of days" [value]="day.key">{{ day.value }}</option>
                        </select>
                    </div>
                    <div class="error" *ngIf="form.get('exerciseDaysAWeek').invalid && form.get('exerciseDaysAWeek').touched"> 
                        Please select days. 
                    </div>
                </div>

                <div class="userInfo-editForm__row">
                    <div class="col-25">
                        <label for="explain">Select one that describes you?</label>
                    </div>
                    <div class="col-75">
                        <select formControlName="bodyType">
                            <option value="">Select</option>
                            <option *ngFor="let type of bodyType" [value]="type.key">{{ type.value }}</option>
                        </select>
                    </div>
                    <div class="error" *ngIf="form.get('bodyType').invalid && form.get('bodyType').touched"> 
                        Please select body type. 
                    </div>
                </div>

                <div class="userInfo-editForm__row">
                    <button class="button button--update" type="button" (click)="submitData()">Edit</button>
                </div>
            </form>
        </div>
    `
})

export class UserInfoEditFormComponent implements OnInit{
    days = [
        { key: '1-2', value: '1-2 times a week'},
        { key: '3-4', value: '3-4 times a week'},
        { key: '5-6', value: '5-6 days a week'},
        { key: '7', value: '7 days a week'}
    ];

    bodyType = [
        {key: 'weight-gain', value: 'Trouble gaining muscle no whater how much I lift & eat'},
        {key: 'skinny-fat', value: 'Look slim but having some extra fat'},
        {key: 'getting-tone', value: 'Okay with the body just want to get tone'},
        {key: 'fat-loss', value: 'Unhappy with the body and want to lose noticeable fat'}
    ];

    @Input() user;

    ngOnInit(){
        if(this.user){
            this.createForm();
        }
    }

    form: FormGroup;

    constructor(private fb: FormBuilder){}

    @Output() edit = new EventEmitter<any>();
    submitData(){
        if (this.form.valid) {
            this.edit.emit(this.form.value);
        }   
    }

    createForm(){
        this.form = this.fb.group({
            exerciseDaysAWeek: [this.user.payload.data().exerciseDaysAWeek, Validators.required],
            bodyType: [this.user.payload.data().bodyType, Validators.required],
        });
    }
}

