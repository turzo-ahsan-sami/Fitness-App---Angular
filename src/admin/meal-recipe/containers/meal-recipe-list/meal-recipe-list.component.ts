import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { MealRecipeService } from './../../services/meal-recipe.service';
import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { map } from 'rxjs/operators';

@Component({
    selector: 'meal-recipe-list',
    styleUrls: ['meal-recipe-list.component.scss'],
    template: `
        <a [routerLink]="['../create']">Create</a>
        <div *ngIf="items | async as meals; else fetching;">
            <list-items [items]="meals" (remove)="RemoveRecipe($event)"></list-items>
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