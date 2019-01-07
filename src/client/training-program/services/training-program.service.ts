import { Observable, from } from 'rxjs';
import { AuthenticationService } from '../../../auth/shared/services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class TrainingProgramService{

    constructor(
        private as: AuthenticationService,
        private afs: AngularFirestore
    ){}

    get user() {
       return this.as.loggedInUser.uid;
    }
    
    trainingType$ = from(this.afs.collection('user-info').doc(`${this.user}`)
        .ref
        .get()
        .then( doc => {
            const data = this.afs.collection('workout-programs').doc(doc.data().bodyType).ref.get()
            .then(results => {
                if(results.data().days == doc.data().exerciseDaysAWeek){
                    const query = results.data()
                    //console.log(query)
                    return query;                    
                }      
            });
        return data;
    }));

    a = this.afs.collection('user-info').doc(`${this.user}`);
    
    
        doc =  this.afs.collection('user-info').doc(`${this.user}`).ref;
        x = this.doc.get().then(function(doc) {
            console.log(doc.data().bodyType);
            return doc.data().bodyType;
           
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });
    

    // x;
    // v;
    // test1 = this.afs.doc(`user-info/${this.user}`).valueChanges().pipe(take(1))
    //     .subscribe(v =>  this.x = console.log(v))

    test$ = from(this.afs.doc(`user-info/${this.user}`)
    .ref
    .get()
    .then( doc => {
        const data = this.afs.collection('workout-programs').doc(doc.data().bodyType).ref.get()
        
        .then(results => {
            console.log(doc.data().bodyType)
            if(results.data().days == doc.data().exerciseDaysAWeek){
                const query = results.data()
                //console.log(query)
                console.log(doc.data().bodyType)
                return query;                    
            }      
        })
        .catch(err => {
            console.log('err'+ err);
        })
    return data;
    }))

}




