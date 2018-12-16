import { AuthenticationService } from './../../../auth/shared/services/authentication.service';
import { of, BehaviorSubject, combineLatest } from 'rxjs';
//import { switchMap, map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';
//import { Observable } from 'rxjs';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class NutritionInfoService{

    get user() {
        return this.as.loggedInUser.uid;
    }

    bodyType;
   
    constructor(
        private as: AuthenticationService,
        public afs: AngularFirestore,
    ){}

    bodyType$ = this.afs.collection('user-info').doc(`${this.user}`)
        .ref
        .get()
        .then( doc => {
            const data = this.afs.collection('nutrition-info').doc(doc.data().bodyType).ref.get()
            .then(results => {
                const query = results.data()
                return query;
            });
        return data;
    });

    async createNutritionInfo(value){
        await this.afs.collection('nutrition-info').doc(value.bodyType).set(value);
    }

    deleteNutrition(key: any){
        return this.afs.collection('nutrition-info').doc(key).delete();
    }

    getNutritionList(){
        return this.afs.collection('nutrition-info').snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
        );
    }

    getNutrition(key: string) {
        if (!key) return of({});

        var doc =  this.afs.collection('nutrition-info').doc(key).ref;
        return doc.get().then(function(doc) {
            return doc.data();
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });
    }
    
    updateNutrition(key, value){
        return this.afs.collection('nutrition-info').doc(key).set(value);
    }

    
}