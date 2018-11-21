import { map } from 'rxjs/operators';
import { Validators, FormArray, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from "@angular/core";

@Component({
    selector: 'user-info',
    styleUrls: ['user-info.component.scss'],
    template: `
    <section>
      <div class="wrapper">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">

          <label for="explain">Are you a man or woman?</label>
          <div class="input-wrap">
            <input type="radio" value="male" name="gender" required formControlName="gender"> Male
            <input type="radio" value="female" name="gender" required formControlName="gender"> Female
          </div>

          <label for="explain">What is your age range?</label>
          <div class="input-wrap select-box">
            <select formControlName="age">
              <option value="">Select</option>
              <option *ngFor="let type of age" [value]="type">{{ type }}</option>
            </select>
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
            {{ form.value.weight }}
          </div>

          <p>How often do you exercise?</p>
          <div class="input-wrap select-box">
            <select formControlName="exerciseDaysAWeek">
              <option value="">Select</option>
              <option *ngFor="let type of days" [value]="type">{{ type }}</option>
            </select>
          </div>

          <label for="explain">Select one that describes you?</label>
          <div class="input-wrap select-box">
            <select formControlName="bodyType">
              <option value="">Select</option>
              <option *ngFor="let type of bodyType" [value]="type">{{ type }}</option>
            </select>
          </div>

          <p>What is your favourite food group?</p>
          <div class="input-wrap">
            <label formArrayName="favFoodGroup" *ngFor="let order of form.controls.favFoodGroup.controls; let i = index">
              <input type="checkbox" [formControlName]="i">
                {{ foodTypes[i].value }}
            </label>
          </div>

          <p>Do you have any food allergies?</p>
          <div *ngFor="let choice of allergries; let i=index" class="input-wrap">
            <label>
              <input type="checkbox" [value]="choice.value" (change)="onCheckChange($event)">
                {{choice.value}}
            </label>
          </div>
        
          <button>submit</button>
        </form>
      </div>
    </section> 
    `
})

export class UserInfoComponent{
    form: FormGroup;

    allergries = [
      { key: 1, value: 'Eggs' },
      { key: 2, value: 'Peanut' },
      { key: 3, value: 'Milk' },
      { key: 4, value: 'Wheat' }
    ];

    days = ['1 day a week', '2-3 days a week', '4-5 days a week', '6-7 days a week'];

    age = ['Teens', '20s', '30s', '40s', '50s', '60s'];

    bodyType = [
       'Trouble gaining muscle no whater how much I lift & eat',
       'Look slim but having some extra fat',
       'Okay with the body just want to get tone',
       'Unhappy with the body and want to lose noticeable fat'
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

    onSubmit() { 
      console.log(this.form.value);
    }

    onCheckChange(event) {
      const formArray: FormArray = this.form.get('allergries') as FormArray;
  
      if(event.target.checked){
        formArray.push(new FormControl(event.target.value));
      }
      else{
        let i: number = 0;
    
        formArray.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == event.target.value) { 
            formArray.removeAt(i);
            return;
          }
    
          i++;
        });
      }
    }
}