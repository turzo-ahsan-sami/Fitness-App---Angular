import { MealPlanService } from './../../../meal-plan/services/meal-plan.service';
import { async } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';
import { SchedulePlanService, ScheduleItem } from './../../services/schedule-plan.service';
import { Component } from '@angular/core';


import { tap, map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'schedule-plan',
    styleUrls: ['schedule-plan.component.scss'],
    template: `
        <div *ngIf="date$ | async as date">
            <calendar (changeDate)="changeDate($event)" (open)="openSection($event)" [date]="date" [items]="schedule$"></calendar>
            <assign-plan *ngIf="openModal" [meals]="meals | async" (add)="createScheduleData($event)" [type]="type$" (close)="closeModal()"></assign-plan>
            
            <div *ngFor="let schedule of schedule$">{{ schedule.workout }}</div>
            {{ schedule$  }}
           
        </div>
    `
})

export class SchedulePlanComponent implements OnInit, OnDestroy{
    constructor(
        public spService: SchedulePlanService,
        private mpService: MealPlanService,
        private af: AngularFireDatabase,
        
    ){}

    sub: Subscription[] = [];
    //sub: Subscription;
    date$:Observable<Date>;
    type$: Observable<any>;
    meals: Observable<any>;
    scheule$: any[];

    ngOnInit(){
       this.date$ = this.spService.date$;
       // this.type$ = this.spService.type$;

        this.sub = [
            this.spService.type$.subscribe(x => this.type$ = x),
            this.spService.scheuleItems$.subscribe(y => console.log(y)),
            this.spService.list$.subscribe(),
            this.spService.items$.subscribe(),
            
            // this.spService.scheule$.subscribe({
            //     next: (v) => console.log(v)
            // })
        ];
        this.meals = this.mpService.getRecipes();
        //this.spService.getFavMealList();

        //this.favMealList$ = this.af.list(`meal-recipes/-LQYleqiEAmkElaKZ-eJ`).valueChanges().pipe(map(val => console.log(val)));
    }

    ngOnDestroy(){
        this.sub.forEach(s => s.unsubscribe());
    }

    changeDate(event: Date){
        return this.spService.changeDate(event); 
    }

    openModal = false;

    closeModal() {
        this.openModal = false;
    }

    openSection(event){
        this.openModal = true;
        this.spService.getType(event);
        console.log(event);
    }

    createScheduleData(items: string[]) {
        //console.log(items);
        this.spService.addScheduleItem(items);
        this.closeModal();
    }

}