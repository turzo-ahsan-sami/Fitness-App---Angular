import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { map, filter, scan } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})

export class MealRecipeService{

    constructor(
        public af:AngularFireDatabase
    ){}

    async createMealRecipe(value){
        await this.af.list('meal-recipes').push(value);
        console.log('Done');
    }

    getRecipe(key: string) {
        return this.af.list(`meal-recipes/${key}`).snapshotChanges().pipe(map(items => {
            return items.map(item => {
                const data = item.payload.val();
                const key = item.payload.key;
                return { data, key };
            })
        }))
       
        // return this.af.list('meal-recipes/'+key).snapshotChanges()
        //     .pipe(map(items => {
        //         return items.map(a => {
        //         const data = a.payload.val();
        //         const key = a.payload.key;
        //         return {key, data};
        //     })
        // }))
    }

    getRecipes(){
        return this.af.list('meal-recipes').valueChanges(); 
    }

    deleteRecipes(key: any){
        return this.af.list('meal-recipes').remove(key);
    }

    
}