import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';
import { SchedulePlanService } from './../../services/schedule-plan.service';
import { Component } from '@angular/core';

@Component({
    selector: 'schedule-plan',
    //styleUrls: ['schedule-plan.component.scss'],
    template: `
        <div *ngIf="date$ | async as date">
            <calendar (changeDate)="changeDate($event)" [date]="date"></calendar>
        </div>
    `
})

export class SchedulePlanComponent implements OnInit, OnDestroy{
    constructor(public spService: SchedulePlanService){}

    sub: Subscription[] = [];
    //sub: Subscription;
    date$:Observable<Date>;

    ngOnInit(){
       this.date$ = this.spService.date$;

        this.sub = [
            this.spService.scheule$.subscribe({
                next: (v) => console.log(v)
            })
        ]
    }

    ngOnDestroy(){
        this.sub.forEach(s => s.unsubscribe());
    }

    changeDate(event: Date){
        return this.spService.changeDate(event); 
    }
}