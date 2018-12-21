import { AngularFirestore } from '@angular/fire/firestore';
import * as FromScheduleActions from './../store/actions/schedule-plan.action';
import { AppState } from './../../../app/app.state';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthenticationService } from 'src/auth/shared/services/authentication.service';
import { from } from 'rxjs';

export interface ScheduleItem {
    Supper: any[],
    Workout: any[],
    section: string,
    timestamp: number,
    $key?: string
}

@Injectable()

export class SchedulePlanService{

    constructor(
        private as: AuthenticationService,
        private store: Store<AppState>,
        private afs: AngularFirestore
    ){}

    date$ = new BehaviorSubject(new Date());
    private category$ = new Subject();

    type$ = this.category$.pipe(
        tap((next: any) => next));

    //
    list$ = this.category$.pipe(map((value: any) => value), tap((next: any) => next));

    //
    private dataList$ = new Subject();
    items$ = this.dataList$.pipe(
        withLatestFrom(this.category$),
        map(([ items, section ]: any[]) => {

            const checkEdit = section.checkEdit;

            console.log(items);
            const defaults: any = {
                section: section.type,
               
                timestamp: new Date(section.selectedDay).getTime()
            };

            const assignedSchedule = { ...(checkEdit == 'edit' ? section.data.Dinner : defaults), ...items };
            
            const test = { ...section.data.Dinner, ...items}
            
            //////
            
            console.log(assignedSchedule)
            //const key = section.data.Dinner.id;

           if (checkEdit == 'new') {
                return this.createPlan(assignedSchedule);
            } else{
                if(section.type == 'Dinner'){
                    const key = section.data.Dinner.id;
                    return this.updatePlan(key, { ...section.data.Dinner, ...items});
                }
                else if(section.type == 'Breakfast'){
                    const key = section.data.Breakfast.id;
                    return this.updatePlan(key, { ...section.data.Breakfast, ...items});
                }
                else if(section.type == 'Lunch'){
                    const key = section.data.Lunch.id;
                    return this.updatePlan(key, { ...section.data.Lunch, ...items})
                }
                else if(section.type == 'Supper'){
                    const key = section.data.Supper.id;
                    return this.updatePlan(key, { ...section.data.Supper, ...items})
                }
                else{
                    const key = section.data.Workout.id;
                    return this.updatePlan(key, { ...section.data.Workout, ...items})
                }
                
            }
    
        })
    );

    scheuleItems$: Observable<any[]> = this.date$.pipe(
        tap((next: any) => next),
        map((day: any )=> {
            const start = ( new Date(day.getFullYear(), day.getMonth(), day.getDate())).getTime();
            const end = ( new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)).getTime() -1;
      
            return { start, end };
        }),
        switchMap(({ start, end }: any) => this.getSchedule(start, end)),
        map((data: any) => {
            
            const mapped: any = {};
            //let mapped: any = {};
    
            for (const prop of data) {
                if (!mapped[prop.section]) {
                    mapped[prop.section] = prop;
                }
                //mapped = prop;
            }
            return mapped;
    
        }),
        tap((next: any) => this.store.dispatch(new FromScheduleActions.LoadPlan(next)))
    );

    changeDate(date: Date){
        this.date$.next(date);
    }

    get user() {
        return this.as.loggedInUser.uid;
    }

    private getSchedule(start: number, end: number) {
        return this.afs.collection('schedule').doc(`${this.user}`).collection('assign', ref => ref.orderBy('timestamp').startAt(start).endAt(end)).snapshotChanges()
        .pipe(map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
              
            });
        }));
    }

    getType(event) {
        this.category$.next(event);
    }

    private createPlan(assignedSchedule: any) {
          const id = this.afs.createId();
          return this.afs.collection('schedule').doc(`${this.user}`).collection('assign').doc(id).set(assignedSchedule);
    }
   
    private updatePlan(key: string, assignedSchedule: any) { 
        return this.afs.collection('schedule').doc(`${this.user}`).collection('assign').doc(key).set(assignedSchedule);
    }

    addScheduleItem(items: string[]) {
        this.dataList$.next(items);
    }

    userInfo$ = this.afs.doc(`user-info/${this.user}`).valueChanges();

    mealSuggestion$ = from(this.afs.collection('user-info').doc(`${this.user}`)
        .ref
        .get()
        .then( doc => {
            return this.afs.collection('meal-recipes', ref => {
                let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                query = query.where('ingredients', 'array-contains', doc.data().favFoodGroup[1])
                console.log(doc.data().favFoodGroup)
                return query;
            }).valueChanges();
        })
    )

    workoutSuggestion$ = from(this.afs.collection('user-info').doc(`${this.user}`)
        .ref
        .get()
        .then( doc => {
            return this.afs.collection('workout-guides', ref => {
                let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                query = query.where('targetBody', 'array-contains', doc.data().bodyType)
                console.log(doc.data().bodyType)
                return query;
            }).valueChanges();
        })
    )
       
}
