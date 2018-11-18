import { map } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from "@angular/core";

@Component({
    selector: 'user-info',
    styleUrls: ['user-info.component.scss'],
    template: `
    <section>
    <div class="wrapper">

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
  
        <p>Do you have any food allergies?</p>
        <div formArrayName="allergy" >
        <div *ngFor="let food of ally.controls; let i=index" class="input-wrap"><input type="checkbox" formControlName="{{ food.type }}">{{ food.key }}
        <label for="a5">Soy</label></div></div>
  
        <p>What is your favourite food group?</p>
        <div class="input-wrap select-box">
          <select formControlName="favFoodGroup">
            <option value="">Select</option>
            <option *ngFor="let type of foodTypes" [value]="type">{{ type }}</option>
          </select>
        </div>
  
        <label for="comfort">What is your go-to comfort food?</label>
        <input name="" type="text" />
  
        <label for="explain">What is your current body Type?</label>
        <div class="input-wrap select-box">
          <select formControlName="bodyType">
            <option value="">Select</option>
            <option *ngFor="let type of bodyTypes" [value]="type">{{ type }}</option>
          </select>
        </div>
  
        <label for="explain">What is your physicl goal?</label>
        <div class="input-wrap select-box">
          <select formControlName="bodyGoal">
            <option value="">Select</option>
            <option *ngFor="let type of bodyGoals" [value]="type">{{ type }}</option>
          </select>
        </div>
  
        <input class="button" type="submit" value="Submit">
      </form>
    </div>
  </section>
      
    `
})

export class UserInfoComponent{
    constructor(private fb: FormBuilder){}

    foodTypes = [ 'Fruit', 'Vegetables', 'Grain', 'Meat', 'Dairy' ];

    bodyTypes = [ 'Skinny', 'Skinny Fat', 'Average', 'Overweight' ];

    bodyGoals = [ 'To Lose weight', 'Getting Toned', 'Gaining Muscle' ];

    allergries = ['US','Germany','France'];

    setAllergies(allergries){
        const a = allergries.map(a =>{
            let obj = {};obj[a]=true;
            return this.fb.group(obj)
        })
        const allergyFA = this.fb.array(a);
        this.form.setControl('allergries',allergyFA);
    };

    get ally() {
        return this.form.get('allegry');
    };
  
    

    form = this.fb.group({
        name: ['', Validators.required],
        age: ['', Validators.required],
        weight: ['', Validators.required],
        bodyType: ['', Validators.required],
        bodyGoal: ['', Validators.required],
        allegry: this.fb.array(['']),
        favFoodGroup: this.fb.array(['']),
    });

}