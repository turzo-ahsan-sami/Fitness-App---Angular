import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})

export class MealRecipeService{

    filterItems$: Observable<any[]>;

    constructor(
        public af:AngularFireDatabase,
        public afs: AngularFirestore
    ){
        this.filterItems$ = combineLatest(
            this.filter$
            ).pipe(
            switchMap(([item]) => 
                this.afs.collection('meal-recipes', ref => {
                let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                if (item) { query = query.where('ingredients', 'array-contains', item) };
               
                console.log(query);
                return query;
                }).valueChanges()
            )
        );
    }

    

    async createMealRecipe(value){
        await this.afs.collection('meal-recipes').add(value);
        //await this.af.list('meal-recipes').push(value);
        console.log('Done');
    }

    getRecipe(key: string) {
        if (!key) return of({});

        var doc =  this.afs.collection('meal-recipes').doc(key).ref;
        return doc.get().then(function(doc) {
            return doc.data();
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });
       
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

    //filter$: BehaviorSubject<string|null>;

    private filter$ = new BehaviorSubject(null);
    
    updateRecipe(key, value){
        return this.afs.collection('meal-recipes').doc(key).set(value);
    }
    

    filterByItem(item: string|null){
        this.filter$.next(item); 
    }

    
}