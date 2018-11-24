import { AppState } from './../../../../app/app.state';
import { Store } from '@ngrx/store';
import { MealPlanService } from './../../../meal-plan/services/meal-plan.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';
import { SchedulePlanService, ScheduleItem } from './../../services/schedule-plan.service';
import { Component } from '@angular/core';


@Component({
    selector: 'schedule-plan',
    styleUrls: ['schedule-plan.component.scss'],
    template: `
        <div class="schedule-plan" *ngIf="date$ | async as date">
            <calendar (changeDate)="changeDate($event)" (open)="openSection($event)" [date]="date" [items]="schedule$ | async"></calendar>
            <assign-plan *ngIf="openModal" [meals]="meals | async" (add)="createScheduleData($event)" [type]="type$" (close)="closeModal()"></assign-plan>
            {{ schedule$ | json }}    
            <div *ngFor="let schedule of schedule$ | async">{{ schedule | json }}</div>
            
        
        </div>
    `
})

export class SchedulePlanComponent implements OnInit, OnDestroy{
    constructor(
        public spService: SchedulePlanService,
        private mpService: MealPlanService,
        private af: AngularFireDatabase,
        private store: Store<AppState>
        
    ){}

    sub: Subscription[] = [];
    //sub: Subscription;
    date$:Observable<Date>;
    type$: Observable<any>;
    meals: Observable<any>;
    schedule$: Observable<any[]>;

    ngOnInit(){
       this.date$ = this.spService.date$;
       // this.type$ = this.spService.type$;
      // this.schedule$ = this.store.select('schedule');

        this.sub = [
            this.spService.type$.subscribe(x => this.type$ = x),
            this.spService.scheuleItems$.subscribe(),
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