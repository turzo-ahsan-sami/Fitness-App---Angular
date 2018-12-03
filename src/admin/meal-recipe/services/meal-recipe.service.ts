import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, filter, scan, withLatestFrom, switchMap } from 'rxjs/operators';



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
          //  return this.af.list('meal-recipes', ref => ref.orderByChild('ingredients').equalTo('')).valueChanges();
        return this.af.list('meal-recipes').valueChanges(); 
    }

    deleteRecipes(key: any){
        return this.af.list('meal-recipes').remove(key);
    }

    //filter$: BehaviorSubject<string|null>;

    private filter$ = new BehaviorSubject(null);
    
    

    filterByItem(item: string|null){
        this.filter$.next(item); 
    }

    
}