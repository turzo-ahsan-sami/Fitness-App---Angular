import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { map, switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class WorkoutGuideService{

    filterItems$: Observable<any[]>;
    private filter$ = new BehaviorSubject(null);

    constructor(
        public af:AngularFireDatabase,
        private afs: AngularFirestore
    ){
        this.filterItems$ = combineLatest(
            this.filter$
            ).pipe(
            switchMap(([item]) => 
                this.afs.collection('workout-guides', ref => {
                let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
               // if (item) { query = query.where('ingredients', 'array-contains', item) };
               
                console.log(query);
                return query;
                }).valueChanges()
            )
        );
    }

    async createWorkout(value){
        await this.afs.collection('workout-guides').add(value);
       // await this.af.list('workout-guides').push(value);
        console.log('Done');
    }

    getWorkouts(){
        return this.af.list('workout-guides').valueChanges(); 
    }

    getWorkout(key: string) {
        return this.af.list(`workout-guides/${key}`).snapshotChanges().pipe(map(items => {
            return items.map(item => {
                const data = item.payload.val();
                const key = item.payload.key;
                return { data, key };
            })
        }))
    }

    deleteWorkout(key: any){
        return this.af.list('workout-guides').remove(key);
    }
}