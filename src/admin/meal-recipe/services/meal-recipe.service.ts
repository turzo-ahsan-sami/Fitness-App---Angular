import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})

export class MealRecipeService{

    constructor(
        public db: AngularFirestore,
        public af:AngularFireDatabase
    ){}

    async createMealRecipe(value){
        await this.af.list('meal-recipes').push({value});
        console.log('Done');
    }
}