import { AuthenticationService } from './../../../auth/shared/services/authentication.service';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class WorkoutProgramService{

    constructor(
        private afs: AngularFirestore,
        private as: AuthenticationService
    ){}

    get user() {
        return this.as.loggedInUser.uid;
    }

    async createWorkoutProgram(value){
        await this.afs.collection('workout-programs').doc(value.bodyType).set(value);
    }

    getWorkoutProgramList(){
        return this.afs.collection('workout-programs').snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
        );
    }

    getWorkoutProgram(key: string) {
        if (!key) return of({});

        var doc =  this.afs.collection('workout-programs').doc(key).ref;
        return doc.get().then(function(doc) {
            return doc.data();
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });
    }
    
    updateWorkoutProgram(key, value){
        return this.afs.collection('workout-programs').doc(key).set(value);
    }
    
    deleteWorkoutProgram(key: any){
        return this.afs.collection('workout-programs').doc(key).delete();
    }
}