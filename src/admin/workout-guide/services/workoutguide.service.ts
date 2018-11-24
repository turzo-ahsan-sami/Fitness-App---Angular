import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class WorkoutGuideService{

    constructor(
        public af:AngularFireDatabase
    ){}

    async createWorkout(value){
        await this.af.list('workout-guides').push(value);
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