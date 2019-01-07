import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../../auth/shared/services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { Injectable } from "@angular/core";

@Injectable()

export class WorkoutProgressService{
   
    day: Date = new Date();
    
    constructor(
        private as: AuthenticationService,
        private afs: AngularFirestore
    ){
        
    }

    get user() {
       return this.as.loggedInUser.uid;
    }

     
    start = ( new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() - 30)).getTime();
    end = ( new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() + 1)).getTime();
    
    // query$ = this.workoutHistory(this.start, this.end);

    // private workoutHistory(start: number, end: number) {

    //     return this.afs.collection('schedule').doc(`${this.user}`).collection('assign', ref => ref.where('section', '==', 'Workout') .orderBy('timestamp').startAt(start).endAt(end)).snapshotChanges()
    //     .pipe(map(actions => {
    //         return actions.map(a => {
    //             const data = a.payload.doc.data();
    //             const id = a.payload.doc.id;
    //       //    console.log(data);
    //             return { id, ...data };
    //         });
    //     }));
    // }

    query$ = 
        this.afs.collection('schedule').doc(`${this.user}`).collection('assign', ref => ref.where('section', '==', 'Workout') .orderBy('timestamp').startAt(this.start).endAt(this.end)).snapshotChanges()
        .pipe(map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                //console.log(data);
                
                return { id, ...data };
            });
        }));

    
    
    


}