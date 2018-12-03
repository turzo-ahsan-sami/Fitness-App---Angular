import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as FromScheduleActions from './../store/actions/schedule-plan.action';
import { AppState } from './../../../app/app.state';
import { Store } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthenticationService } from 'src/auth/shared/services/authentication.service';


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
        private af: AngularFireDatabase,
        private store: Store<AppState>,
        private afs: AngularFirestore
    ){}

    date$ = new BehaviorSubject(new Date());
    private category$ = new Subject();
    
    //
    // this.userInfo = this.usersCollection.snapshotChanges().pipe(
    //     map(actions => actions.map(a => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //      // return a;
    //     }))
    //   );
    type$ = this.category$.pipe(
        tap((next: any) => next));

    //
    list$ = this.category$.pipe(map((value: any) => value), tap((next: any) => next));

    //
    private dataList$ = new Subject();
    items$ = this.dataList$.pipe(
        withLatestFrom(this.category$),
        map(([ items, section ]: any[]) => {

        const id = section.data.$key;
        console.log(id);

        console.log(items);
        const defaults: any = {
            // workout: null,
            // supper: null,
            section: section.type,
          
            timestamp: new Date(section.selectedDay).getTime()
        };

        const assignedSchedule = { ...(id ? section.data : defaults), ...items };

        if (id) {
            return this.updatePlan(id, assignedSchedule);
        } else {
            return this.createPlan(assignedSchedule);
        }

    }));

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
    
            for (const prop of data) {
                if (!mapped[prop.section]) {
                    mapped[prop.section] = prop;
                }
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



    feeds: Observable<any>;
    getFavMealList(){

        return this.af.list(`fav-meal-list/XrEd4vW6fLXr00iaNBsEw3PDlTA3`).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.val();
                const id = a.payload.key;
                console.log(this.user,id, data);
                return this.af.list(`meal-recipes/-LQYlOUQ4pMWpopTRc81`).valueChanges();
                         
                //return { id, data };
            }))
          );

        // return this.af.list(`fav-meal-list/XrEd4vW6fLXr00iaNBsEw3PDlTA3`).valueChanges().pipe(map(
        //     (keys) => {
        //         return keys.map(key => {
        //             return this.af.list(`meal-recipes/${key}`);
        //         })
        //     }
        // ));  
    }
    //
    //
    private getSchedule(start: number, end: number) {
        return this.afs.collection('schedule').doc('5I8TTANA98Zt4SPo4gKi1J2tdru1').collection('assign', ref => ref.orderBy('timestamp').startAt(start).endAt(end)).valueChanges();
          
     //   return this.af.list(`schedule/XrEd4vW6fLXr00iaNBsEw3PDlTA3`, ref => ref.orderByChild('timestamp').startAt(start).endAt(end)).valueChanges();
    }

    getType(event) {
        this.category$.next(event);
    }

    //
    private createPlan(assignedSchedule: any) {
          const id = this.afs.createId();
          return this.afs.collection('schedule').doc(`${this.user}`).collection('assign').doc(id).set(assignedSchedule);
        //return this.afs.collection('schedule').doc(`${this.user}`).set(assignedSchedule);
        //return this.af.list(`schedule/XrEd4vW6fLXr00iaNBsEw3PDlTA3`).push(assignedSchedule);
        //console.log(payload);
    }
    
    //
    private updatePlan(key: string, assignedSchedule: any) {
        console.log(key);
        return this.af.object(`schedule/XrEd4vW6fLXr00iaNBsEw3PDlTA3/${key}`).update(assignedSchedule);
    }

    addScheduleItem(items: string[]) {
       // console.log(items);
        this.dataList$.next(items);
    }

    //list$ = this.category$.pipe(map((value: any) => console.log(value)));

    // userInfo$ = this.afs.collection('user-info').snapshotChanges().pipe(
    //       map(actions => actions.map(a => {
    //         const data = a.payload.doc.data();
    //         const id = a.payload.doc.id;
            
    //         return { id, ...data };
    //         //return a;
    //       })),
    //       tap(next => next)
    //     );

    userInfo$ = this.afs.doc('user-info/5I8TTANA98Zt4SPo4gKi1J2tdru1').valueChanges();
    

    
}
