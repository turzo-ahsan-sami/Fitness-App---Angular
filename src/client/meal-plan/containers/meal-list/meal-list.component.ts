import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { MealPlanService } from '../../services/meal-plan.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'meal-list',
    styleUrls: ['meal-list.component.scss'],
    template: `
        List
        <div *ngIf="meals$ | async as meals">
        <div *ngFor="let meal of meals">
            <button type="button" (click)="dispatchFavMealList(meal.key)">
                Create 
            </button>
        </div>
        </div>
    `
})

export class MealListComponent implements OnInit{
    constructor(
        private mealService: MealPlanService,
        private afs: AngularFirestore
    ){}

    meals$: Observable<any>;

    ngOnInit(){
        this.meals$ = this.mealService.getRecipes();
    }

    private userDoc: AngularFirestoreDocument<any>;
    item: Observable<any>;

    dispatchFavMealList(key){
        return this.mealService.addToList(key);

        //this.userDoc = this.afs.doc<any>('user/david');
        //this.item = this.userDoc.collection<any>('tasks');
        //this.item = this.userDoc.valueChanges();
    }

    

}