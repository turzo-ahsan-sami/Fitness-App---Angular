import { Component, OnChanges, Output, EventEmitter } from "@angular/core";
import { FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'meal-recipe-form',
    template: `
        Form
        <form [formGroup]="form">
            <input type="text" formControlName="name">

            <button type="button" (click)="addIngredient()">+</button>
            <div formArrayName="ingredients">
                <label *ngFor="let ingredient of ingredients.controls; index as i;">
                    <input [formControlName]="i">
                </label>
            </div>

            <button type="button" (click)="addInstructions()">+</button>
            <div formArrayName="instructions">
                <label *ngFor="let instruction of instructions.controls; index as i;">
                    <input [formControlName]="i">
                </label>
            </div>

            <button class="button" type="button"(click)="dispatchMeal()">
              Create 
            </button>
        </form>
    `
})

export class MealRecipeFormComponent implements OnChanges{
    constructor(private fb: FormBuilder) {}

    form = this.fb.group({
        name: ['', Validators.required],
        ingredients: this.fb.array(['']),
        instructions: this.fb.array([''])
    });

    ngOnChanges(){

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

    @Output()
    create = new EventEmitter<any>();

    dispatchMeal(){
        this.create.emit(this.form.value);
    }
}
