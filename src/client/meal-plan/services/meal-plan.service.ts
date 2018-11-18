import { AuthenticationService } from './../../../auth/shared/services/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

@Injectable()

export class MealPlanService{
    constructor(
        public af:AngularFireDatabase,
        private as: AuthenticationService
    ){}

    getRecipes(){
        return this.af.list('meal-recipes').snapshotChanges().pipe(
            map(changes => 
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );; 
    }

    get user() {
        return this.as.loggedInUser.uid;
    }

    addToList(key: string){
        return this.af.list(`fav-meal-list/${this.user}`).push(key);
    }
}