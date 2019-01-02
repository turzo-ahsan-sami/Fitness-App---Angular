import { NutritionInfoService } from './../../../../admin/nutrition-info/services/nutrition-info.service';
import { WorkoutGuideService } from './../../../../admin/workout-guide/services/workoutguide.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MealRecipeService } from './../../../../admin/meal-recipe/services/meal-recipe.service';
import { AppState } from './../../../../app/app.state';
import { Store } from '@ngrx/store';

import { Subscription, Observable } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';
import { SchedulePlanService } from './../../services/schedule-plan.service';
import { Component } from '@angular/core';

@Component({
    selector: 'schedule-plan',
    styleUrls: ['schedule-plan.component.scss'],
    template: `
        <div class="schedule-plan" *ngIf="date$ | async as date">
            <calendar (changeDate)="changeDate($event)" [calorieInfo]="nutrientsInfoForWeightGain$ | async" (open)="openSection($event)" [date]="date" [items]="schedule$"></calendar>
            <assign-meal *ngIf="openModalForMeal" [user]="userInfo" [meals]="items$" [suggestMeals]="suggestMeals$" (add)="createScheduleData($event)" [type]="type$" (close)="closeModal()" (filter)="filterBy($event)"></assign-meal>
            <assign-workout *ngIf="openModalForWorkout" [user]="userInfo" [workouts]="workouts$" [suggestWorkouts]="suggestWorkouts$" (add)="createScheduleData($event)" (close)="closeModal()" (filter)="filterBy($event)" [type]="type$" ></assign-workout>     
        </div>
    `
})

export class SchedulePlanComponent implements OnInit, OnDestroy{

    constructor(
        public spService: SchedulePlanService,
        private store: Store<AppState>,
        private mrService: MealRecipeService,
        private wgService: WorkoutGuideService,
        public afs: AngularFirestore,
        private niService: NutritionInfoService
    ){}

    sub: Subscription[] = [];
    date$:Observable<Date>;
    type$: Observable<any>;
   
    

    workouts$;
    items$;
    userInfo;
    suggestWorkouts$: Observable<any>;
  
    schedule$: any[];
    suggestMeals$: Observable<any>;
    nutrientsInfoForWeightGain$;

    ngOnInit(){
       this.date$ = this.spService.date$;
       // this.type$ = this.spService.type$;
      // this.schedule$ = this.store.select('schedule');
        this.nutrientsInfoForWeightGain$ = this.niService.bodyType$;
        this.sub = [
            this.spService.type$.subscribe(x => {this.type$= x;console.log(this.type$) }),
            this.spService.scheuleItems$.subscribe(z => this.schedule$ = z),
            this.spService.list$.subscribe(),
            this.spService.items$.subscribe(),
            this.mrService.items$.subscribe(y => this.items$ = y),
            this.wgService.items$.subscribe(x => this.workouts$ = x),
            this.spService.userInfo$.subscribe(x => this.userInfo = x),
            this.spService.mealSuggestion$.subscribe(x => this.suggestMeals$ = x),
            this.spService.workoutSuggestion$.subscribe(x => this.suggestWorkouts$ = x)
        ];
    }

    ngOnDestroy(){
        this.sub.forEach(s => s.unsubscribe());
    }

    changeDate(event: Date){
        return this.spService.changeDate(event); 
    }

    openModalForMeal = false;
    openModalForWorkout = false;

    closeModal() {
        this.openModalForMeal = false;
        this.openModalForWorkout = false;
    }

    openSection(event){
        if(event.type == 'Workout'){
            this.openModalForWorkout = true;
        }
        else{
            this.openModalForMeal = true;
        }
        
        this.spService.getType(event);
    }

    createScheduleData(items: string[]) {
        this.spService.addScheduleItem(items);
        this.closeModal();
        console.log(items);
    }

    filterBy(event){
        return this.mrService.filterByItem(event);
    }

} 