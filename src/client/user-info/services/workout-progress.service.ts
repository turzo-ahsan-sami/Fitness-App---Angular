import { map } from 'rxjs/operators';
import { AuthenticationService } from './../../../auth/shared/services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { Injectable } from "@angular/core";

@Injectable()

export class WorkoutProgressService{
   
    day: Date = new Date();
    query;
    constructor(
        private as: AuthenticationService,
        private afs: AngularFirestore
    ){
        const start = ( new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() - 20)).getTime();
        const end = ( new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() + 10)).getTime();
        this.query = this.workoutHistory(start, end);
    }

    get user() {
       return this.as.loggedInUser.uid;
    }

    private workoutHistory(start: number, end: number) {
        return this.afs.collection('schedule').doc(`${this.user}`).collection('assign', ref => ref.orderBy('timestamp').startAt(start).endAt(end)).snapshotChanges()
        .pipe(map(actions => {
            return actions.map(a => {
                if(a.payload.doc.data().section == 'Workout'){
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    console.log(data);
                    return { id, ...data };
                }
            });
        }));
    }
    


}