import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { map, switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class WorkoutGuideService{

    items$: Observable<any[]>;
    private filter$ = new BehaviorSubject(null);

    constructor(
        public af:AngularFireDatabase,
        private afs: AngularFirestore
    ){
        this.items$ = combineLatest(
            this.filter$
            ).pipe(
            switchMap(([item]) => 
                this.afs.collection('workout-guides', ref => {
                let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                if (item) { query = query.where('targetArea', '==', item) };
               
                // console.log(query);
                return query;
                }).valueChanges()
            )
        );
    }

    filterByItem(item: string|null){
        this.filter$.next(item); 
    }

    async createWorkout(value){
        await this.afs.collection('workout-guides').add(value);
    }

    getWorkouts(){
        return this.afs.collection('workout-guides').snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
        );
    }

    getWorkout(key: string) {
        if (!key) return of({});

        var doc =  this.afs.collection('workout-guides').doc(key).ref;
        return doc.get().then(function(doc) {
            return doc.data();
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });
    }

    updateWorkout(key, value){
        return this.afs.collection('workout-guides').doc(key).set(value);
    }

    deleteWorkout(key: any){
        return this.afs.collection('workout-guides').doc(key).delete();
    }
}