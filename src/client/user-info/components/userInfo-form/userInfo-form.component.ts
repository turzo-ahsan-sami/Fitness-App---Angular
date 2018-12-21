import { EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { Validators, FormArray, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'userInfo-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['userInfo-form.component.scss'],
    template: `
        <form [formGroup]="form">

            <label for="explain">What is your gender?</label>
            <div class="input-wrap">
                <input type="radio" value="male" name="gender" required formControlName="gender"> Male
                <input type="radio" value="female" name="gender" required formControlName="gender"> Female
            </div>

            <div class="error" *ngIf="form.get('gender').invalid && form.get('gender').touched"> 
                Please select gender. 
            </div> 

            <label for="explain">What is your age range?</label>
            <div class="input-wrap select-box">
                <select formControlName="age">
                    <option value="">Select</option>
                    <option *ngFor="let type of age" [value]="type">{{ type }}</option>
                </select>
            </div>
            <div class="error" *ngIf="form.get('age').invalid && form.get('age').touched"> 
                Please select age. 
            </div>

            <label for="explain">How much do you weight? (lbs)</label>
            <div class="input-wrap">
                <input type="range" min="50" max="200" formControlName="weight" list="tickmarks">
                <datalist id="tickmarks">
                    <option value="50" label="50">
                    <option value="75">
                    <option value="100" label="100">
                    <option value="125">
                    <option value="150" label="150">
                    <option value="175">
                    <option value="200" label="200">
                    <option value="225">
                    <option value="250" label="250">
                </datalist>
                <span>{{ form.value.weight }}</span>
            </div>
            <div class="error" *ngIf="form.get('weight').invalid && form.get('weight').touched"> 
                Please select your weight. 
            </div>

            <p>How often do you exercise?</p>
            <div class="input-wrap select-box">
                <select formControlName="exerciseDaysAWeek">
                    <option value="">Select</option>
                    <option *ngFor="let day of days" [value]="day.key">{{ day.value }}</option>
                </select>
            </div>
            <div class="error" *ngIf="form.get('exerciseDaysAWeek').invalid && form.get('exerciseDaysAWeek').touched"> 
                Please select days. 
            </div>

            <label for="explain">Select one that describes you?</label>
            <div class="input-wrap select-box">
                <select formControlName="bodyType">
                    <option value="">Select</option>
                    <option *ngFor="let type of bodyType" [value]="type.key">{{ type.value }}</option>
                </select>
            </div>
            <div class="error" *ngIf="form.get('bodyType').invalid && form.get('bodyType').touched"> 
                Please select body type. 
            </div>

            <p>What is your favourite food group?</p>
            <div *ngFor="let choice of foodTypes; let i = index" class="input-wrap">
                <label>
                    <input type="checkbox" [value]="choice.value" (change)="onFoodCheck($event)">
                    {{ choice.value }}
                </label>
            </div>

            <p>Do you have any food allergies?</p>
            <div *ngFor="let choice of allergries; let i=index" class="input-wrap">
                <label>
                    <input type="checkbox" [value]="choice.value" (change)="onAllergyCheck($event)">
                    {{choice.value}}
                </label>
            </div>
        
            <button type="button" (click)="submitData()">submit</button>
        </form>
    `
})

export class UserInfoFormComponent{

    form: FormGroup;

    allergries = [
      { key: 1, value: 'Eggs' },
      { key: 2, value: 'Peanut' },
      { key: 3, value: 'Milk' },
      { key: 4, value: 'Wheat' }
    ];

    days = [
        { key: '1-2', value: '1-2 times a week'},
        { key: '3-4', value: '3-4 times a week'},
        { key: '5-6', value: '5-6 days a week'},
        { key: '7', value: '7 days a week'}
    ];

    age = ['Teens', '20s', '30s', '40s', '50s', '60s'];

    bodyType = [
       {key: 'weight-gain', value: 'Trouble gaining muscle no whater how much I lift & eat'},
       {key: 'skinny-fat', value: 'Look slim but having some extra fat'},
       {key: 'getting-tone', value: 'Okay with the body just want to get tone'},
       {key: 'fat-loss', value: 'Unhappy with the body and want to lose noticeable fat'}
    ];

    foodTypes = [ 
      { key: 'fruit', value: 'Fruits' },
      { key: 'vegetable', value: 'Vegetables' },
      { key: 'grain', value: 'Grain' },
      { key: 'dairy', value: 'Dariy' }
    ];

    constructor(private fb: FormBuilder){
      
      this.form = this.fb.group({
        gender: ['', Validators.required],
        age: ['', Validators.required],
        weight: ['', Validators.required],
        exerciseDaysAWeek: ['', Validators.required],
        bodyType: ['', Validators.required],
        allergries: new FormArray([]),
        favFoodGroup: new FormArray([]),
      });
    }

    onAllergyCheck(event) {
        const allergries: FormArray = this.form.get('allergries') as FormArray;
        
        if(event.target.checked){
            allergries.push(new FormControl(event.target.value));
        }
        else{
            let i: number = 0;

            allergries.controls.forEach((ctrl: FormControl) => {
                if(ctrl.value == event.target.value) { 
                allergries.removeAt(i);
                return;
                }

                i++;
            });
        }
    }

    onFoodCheck(event) {
        const favFood: FormArray = this.form.get('favFoodGroup') as FormArray;
        
        if(event.target.checked){
            favFood.push(new FormControl(event.target.value));
        }
        else{
          let i: number = 0;
      
          favFood.controls.forEach((ctrl: FormControl) => {
            if(ctrl.value == event.target.value) { 
                favFood.removeAt(i);
              return;
            }
      
            i++;
          });
        }
    }

    @Output() submit = new EventEmitter<any>();
    submitData(){
        if (this.form.valid) {
            this.submit.emit(this.form.value);
        }   
    }
}