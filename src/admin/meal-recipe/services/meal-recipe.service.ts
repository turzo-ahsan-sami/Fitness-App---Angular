import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class MealRecipeService{

    items$: Observable<any[]>;

    constructor(
        public afs: AngularFirestore
    ){
        this.items$ = combineLatest(
            this.filter$
            ).pipe(
            switchMap(([item]) => 
                this.afs.collection('meal-recipes', ref => {
                let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                if (item) { query = query.where('foodType', 'array-contains', item) };
               
                return query;
                }).valueChanges()
            )
        );
    }

    createMealRecipe(value){
        return this.afs.collection('meal-recipes').add(value);
    }

    getRecipe(key: string) {
        if (!key) return of({});

        var doc =  this.afs.collection('meal-recipes').doc(key).ref;
        return doc.get().then(function(doc) {
            return doc.data();
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });
    }

    getRecipes(){
        return this.afs.collection('meal-recipes').snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
        );
    }

    deleteRecipes(key: any){
        return this.afs.collection('meal-recipes').doc(key).delete();
    }

    private filter$ = new BehaviorSubject(null);
    
    updateRecipe(key, value){
        return this.afs.collection('meal-recipes').doc(key).set(value);
    }
    
    filterByItem(item: string|null){
        this.filter$.next(item); 
    }

}