import { AuthenticationService } from '../../../auth/shared/services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";

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
    
    trainingType$ = this.afs.collection('user-info').doc(`${this.user}`)
        .ref
        .get()
        .then( doc => {
            const data = this.afs.collection('workout-programs').doc(doc.data().bodyType).ref.get()
            .then(results => {
                if(results.data().days == doc.data().exerciseDaysAWeek){
                    const query = results.data()
                    console.log(query)
                    return query;
                    
                }      
            });
        return data;
    });

}




