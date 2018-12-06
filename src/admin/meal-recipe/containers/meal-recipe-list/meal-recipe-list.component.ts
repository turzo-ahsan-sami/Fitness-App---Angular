import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { MealRecipeService } from './../../services/meal-recipe.service';
import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'meal-recipe-list',
    template: `
        <ul>
            <a [routerLink]="['../meal-recipe/create']">Create</a>

            <list-items *ngFor="let item of items | async" [item]="item" (remove)="RemoveRecipe($event)">
            </list-items>
        </ul>
        <button (click)="filterByIngredients('app')">Red</button>
    `
})

export class MealRecipeListComponent implements OnInit{ 
    
    subscription: Subscription;
    items: Observable<any[]>;
    // items: Array<any>;
    favMealList:Observable<any[]>;
    size$: BehaviorSubject<string|null>;

    items$: Observable<any[]>;
    sizeFilter$: BehaviorSubject<string|null>;
    sizee = ['app', 'potato']
    constructor(
        public mealRecipeService: MealRecipeService,
        public db: AngularFireDatabase,
        afs: AngularFirestore){

            this.sizeFilter$ = new BehaviorSubject(null);

            
           
            this.items = 
                afs.collection('meal-recipes', ref => {
                let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                
                 
                    
                   
                        query = query.where('ingredients', 'array-contains', 'potato')
                        query = query.where('calorie', '==', '200')
                        query.get().then(snapshot => {
                            snapshot.forEach(res => console.log(res.data()))
                        })
                       
                    
                    
                
               
                return query;
                }).valueChanges()
                
            
            ;
        //const col = afs.collection('meal-recipes', ref => ref.where('ingredients', 'array-contains', 'potato'));
       
        



        // this.items = this.size$.pipe(
        //     switchMap(ingredients => 
        //       db.list('/meal-recipes', ref =>
        //         ingredients ? ref.orderByChild('ingredients').equalTo('yoghurt') : ref
        //       ).snapshotChanges()
        //     )
        //   );
        //this.items = this.db.list('meal-recipes', ref => ref.orderByChild('ingredients').equalTo('yoghurt')).snapshotChanges();
        //this.items = db.list('meal-recipes').snapshotChanges();
        //this.mealRecipeService.getRecipes().subscribe(result => { this.items = result; })
    }

    ngOnInit(){
      //  this.items = this.mealRecipeService.getRecipes().subscribe();
    }

    RemoveRecipe(key: any){
        this.mealRecipeService.deleteRecipes(key);
    }

    filterByIngredients(size: string|null) {
        this.sizeFilter$.next(size); 
    }
}