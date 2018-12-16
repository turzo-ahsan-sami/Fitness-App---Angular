import { AppState } from './../../../app/app.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './../../../auth/shared/services/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';

@Injectable()

export class MealPlanService{
    a
    constructor(
        public af:AngularFireDatabase,
        private afs: AngularFirestore,
        private as: AuthenticationService,
        private store: Store<AppState>,
    ){
        this.a = this.store.select('schedule');
        console.log(this.a);
    }

    getRecipes(){
        return this.af.list('meal-recipes').snapshotChanges().pipe(
            map(changes => 
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        ); 
    }

    get user() {
        return this.as.loggedInUser.uid;
    }

   // suggestedMeal$: Observable<any[]>;

    
    


    suggestedMeal$ = from(this.afs.collection('user-info').doc('5I8TTANA98Zt4SPo4gKi1J2tdru1')
    .ref
    .get()
    .then( doc => {
        return this.afs.collection('meal-recipes', ref => {
            let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
            query = query.where('ingredients', 'array-contains', doc.data().allergries[1])
            console.log(doc.data().favFoodGroup)
            return query;
        }).valueChanges();
    })
    )
    
    
}