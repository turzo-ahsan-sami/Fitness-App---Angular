import { FormGroup } from '@angular/forms';
import { Component, Input, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'meal-recipe-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['meal-recipe-form.component.scss'],
    template: `
        <div class="meal-recipe-form">
            <form [formGroup]="form" novalidate>

                <div class="meal-recipe-form__row">
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

                <div class="meal-recipe-form__row">
                    <div class="col-25">
                        <label>Meal Ingredients</label>
                    </div>
                    <div formArrayName="ingredients" class="col-75">
                        <label *ngFor="let ingredient of ingredients.controls; index as i;">
                            <input type="text" class="ingredients" [formControlName]="i">
                        </label>
                        <button class="array" type="button" (click)="addIngredient()">+</button>
                    </div>
                </div>

                <div class="meal-recipe-form__row">
                    <div class="col-25">
                        <label>Cooking Instructions</label>
                    </div>
                    <div formArrayName="instructions" class="col-75">
                        <label *ngFor="let instruction of instructions.controls; index as i;">
                            <input type="text" class="instructions" [formControlName]="i">
                        </label>
                        <button class="array" type="button" (click)="addInstructions()">+</button>
                    </div>
                </div>

                <div class="meal-recipe-form__row"> 
                    <div class="col-25"> 
                        <label>Calorie Amount</label>  
                    </div> 
                    <div class="col-75"> 
                        <input type="number" formControlName="calorie">
                        <div class="error" *ngIf="form.get('calorie').hasError('required') && form.get('calorie').touched"> 
                            Required Field. 
                        </div>
                    </div>
                </div>

                <div class="meal-recipe-form__row"> 
                    <div class="col-25"> 
                        <label>Fat Amount</label>  
                    </div> 
                    <div class="col-75"> 
                        <input type="text" formControlName="fat">
                        <div class="error" *ngIf="form.get('fat').hasError('required') && form.get('fat').touched"> 
                            Required Field. 
                        </div>
                    </div>
                </div>

                <div class="meal-recipe-form__row"> 
                    <div class="col-25"> 
                        <label>Protein Amount</label>  
                    </div> 
                    <div class="col-75"> 
                        <input type="text" formControlName="protein">
                        <div class="error" *ngIf="form.get('protein').hasError('required') && form.get('protein').touched"> 
                            Required Field. 
                        </div>
                    </div>
                </div>

                <div class="meal-recipe-form__row">
                    <div class="col-25">
                        <label>Food Type</label>
                    </div>
                    <div formArrayName="foodType" class="col-75">
                       <!-- <label *ngFor="let order of form.controls.foodType.controls; let a = index">
                            <div  *ngFor="let type of foodTypes; let i = index">
                            <input type="checkbox" class="instructions" [value]="type.key" [checked]=" a == i"> 
                            </div>
                        </label> -->
                        
                    </div>
                    <div class="col-75" *ngFor="let type of foodTypes; let i = index">
                        <label>
                            <input type="checkbox" [value]="type.key" (change)="onFoodCheck($event)" >
                            {{ type.value }}
                        </label>
                    </div>
                </div>

                <div class="meal-recipe-form__row">
                    <div class="col-25">
                        <label>Suitable for </label>
                    </div>
                    <div class="col-75" *ngFor="let type of bodyTypes; let i = index" >
                        <label>
                            <input type="checkbox" [value]="type.key" (change)="onbodyTypeCheck($event)">
                            {{ type.value }}
                        </label>
                    </div>
                </div>

                <div class="meal-recipe-form__row">
                    <button class="button button--create" *ngIf="!exists" 
                        type="button" [disabled]="form.invalid" (click)="dispatchMeal()">
                        Create
                    </button>
                    <button class="button button--create" type="button" 
                        *ngIf="exists" (click)="updateMeal()">
                        Update
                    </button>
                    <a class="button button--cancel" [routerLink]="['../list']">Cancel</a>
                </div>
                
            </form>
        </div>
    `
})

export class MealRecipeFormComponent implements OnChanges{
    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            ingredients: this.fb.array(['']),
            instructions: this.fb.array(['']),
            calorie: ['', [Validators.required, Validators.pattern('[0-9]+')]],
            fat: ['', Validators.required],
            protein: ['', Validators.required],
            targetedBody: new FormArray([]),
            foodType: new FormArray([]),
        });
    }

    validateNumber() {
        return ['', [
          Validators.required,
          Validators.pattern('[0-9]+')  
        ]]
    }

    form: FormGroup;

    bodyTypes = [
        {key: 'weight-gain', value: 'Hard gainers'},
        {key: 'skinny-fat', value: 'Building body mass'},
        {key: 'getting-tone', value: 'Calorie watcher'},
        {key: 'fat-loss', value: 'Weight loss'}
     ];
 
     foodTypes = [ 
       { key: 'fruit', value: 'Fruits' },
       { key: 'vegetable', value: 'Vegetables' },
       { key: 'grain', value: 'Grain' },
       { key: 'dairy', value: 'Dariy' },
       { key: 'salad', value: 'Salad' },
       { key: 'curry', value: 'Curry' },
     ];

    @Input() doc;
    
    exists = false;

    ngOnChanges(){
        if (this.doc && this.doc.name) {
            this.exists = true;
            this.emptyIngredients();
        
            const value = this.doc;
            this.form.patchValue(value);
      
            if (value.ingredients) {
                for (const item of value.ingredients) {
                    this.ingredients.push(new FormControl(item));
                }
            }

            // this.emptyFoodTypes();
            // if(value.foodType){
            //     for (const item of value.foodType) {
            //         if(item){
            //             this.foodType.push(new FormControl(item));
            //         }
            //     }
            // }
      
        }
    }
    
    get ingredients() {
        return this.form.get('ingredients') as FormArray;
    }

    get instructions() {
        return this.form.get('instructions') as FormArray;
    }

    addIngredient() {
        this.ingredients.push(new FormControl(''));
    }

    addInstructions() {
        this.instructions.push(new FormControl(''));
    }

    @Output() create = new EventEmitter<any>();

    dispatchMeal(){
        if(this.form.valid){
            this.create.emit(this.form.value);
            //console.log(this.form.value)
        }
      
    }

    @Output() update = new EventEmitter<any>();
    updateMeal(){
        if (this.form.valid) {
            this.update.emit(this.form.value);
        }
    }

    get foodType(){
        return this.form.get('foodType') as FormArray;
    }

    onFoodCheck(event) {
        const favFood: FormArray = this.form.get('foodType') as FormArray;
        
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

    onbodyTypeCheck(event) {
        const tb: FormArray = this.form.get('targetedBody') as FormArray;
        
        if(event.target.checked){
            tb.push(new FormControl(event.target.value));
        }
        else{
          let i: number = 0;
      
          tb.controls.forEach((ctrl: FormControl) => {
            if(ctrl.value == event.target.value) { 
                tb.removeAt(i);
              return;
            }
            i++;
          });
        }
    }

    emptyIngredients() {
        while(this.ingredients.controls.length) {
          this.ingredients.removeAt(0);
        }
    }

    emptyFoodTypes() {
        while(this.foodType.controls.length) {
            this.foodType.removeAt(0);
        }
    }
}
