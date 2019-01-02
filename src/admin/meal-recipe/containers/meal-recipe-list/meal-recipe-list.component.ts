import { MealRecipeService } from './../../services/meal-recipe.service';
import { Component, OnInit } from "@angular/core";
import { Observable, Subscription, BehaviorSubject, combineLatest } from 'rxjs';


@Component({
    selector: 'meal-recipe-list',
    styleUrls: ['meal-recipe-list.component.scss'],
    template: `
        <div class="meal-recipe-list">
            <div class="meal-recipe-list__link">
                <a [routerLink]="['../create']">Create + </a>
            </div>
            <div class="meal-recipe-list__list" *ngIf="items | async as meals; else fetching;">
                <list-items [items]="meals" (remove)="RemoveRecipe($event)"></list-items>
            </div>
        </div>
        <ng-template #fetching>
            <div class="message">
                <spinning-icon></spinning-icon>
            </div>
        </ng-template>
                      
        
    `
})

export class MealRecipeListComponent implements OnInit{ 
    
    subscription: Subscription;
    // items: Array<any>;
    favMealList:Observable<any[]>;
    size$: BehaviorSubject<string|null>;

    items: Observable<any[]>;
    
    constructor(
        public mealRecipeService: MealRecipeService
    ){}

    ngOnInit(){
        this.items = this.mealRecipeService.getRecipes();
    }

    RemoveRecipe(key: any){
        this.mealRecipeService.deleteRecipes(key);
    }

}