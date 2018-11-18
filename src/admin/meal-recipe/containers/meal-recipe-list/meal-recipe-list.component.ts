import { MealRecipeService } from './../../services/meal-recipe.service';
import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'meal-recipe-list',
    template: `
        <ul>
            <a [routerLink]="['../meal-recipe/create']">Create</a>

            <list-items *ngFor="let item of items | async" [item]="item" (remove)="RemoveRecipe($event)">
            </list-items>
        </ul>
    `
})

export class MealRecipeListComponent implements OnInit{ 
    
    subscription: Subscription;
    items: Observable<any[]>;
    // items: Array<any>;
    favMealList:Observable<any[]>;

    constructor(
        public mealRecipeService: MealRecipeService,
        public db: AngularFireDatabase){
        this.items = db.list('meal-recipes').snapshotChanges();
        //this.mealRecipeService.getRecipes().subscribe(result => { this.items = result; })
    }

    ngOnInit(){
      //  this.items = this.mealRecipeService.getRecipes().subscribe();
    }

    RemoveRecipe(key: any){
        this.mealRecipeService.deleteRecipes(key);
    }
}