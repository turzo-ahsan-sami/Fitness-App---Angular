import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()

export class SchedulePlanService{
    date$ = new BehaviorSubject(new Date());

    scheule$: Observable<any[]> = this.date$.pipe(tap((next: any) => next));

    changeDate(date: Date){
        this.date$.next(date);
    }
}
