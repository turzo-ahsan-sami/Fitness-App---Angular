import { Component } from '@angular/core';
import { MealRecipeService } from '../../services/meal-recipe.service';
import { Router } from '@angular/router';



@Component({
    selector: 'meal-recipe',
    template: `
        <div>
            Meal Recipe
            <meal-recipe-form (create)="createMeal($event)"></meal-recipe-form>
            <div *ngIf="err">{{ err }}</div>
        </div>
    `
})

export class MealRecipeComponent{

    err; 
    constructor(
        private fs: MealRecipeService
    ){}

    createMeal(event: any){
        this.fs.createMealRecipe(event);
       
        
       // this.router.navigate(['/home']);
    }
}