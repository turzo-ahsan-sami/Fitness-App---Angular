import { Component } from '@angular/core';

@Component({
    selector: 'meal-recipe',
    template: `
        <div>
            Meal Recipe
            <meal-recipe-form (create)="createMeal($event)"></meal-recipe-form>
        </div>
    `
})

export class MealRecipeComponent{
    createMeal(event: any){
        console.log(event);
    }
}