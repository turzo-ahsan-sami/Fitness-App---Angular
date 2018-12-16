import { NutritionInfoService } from './../../../../admin/nutrition-info/services/nutrition-info.service';
import { WorkoutGuideService } from './../../../../admin/workout-guide/services/workoutguide.service';
import { UserInfoService } from './../../../user-info/services/user-info.service';
import { map, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MealRecipeService } from './../../../../admin/meal-recipe/services/meal-recipe.service';
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
            <calendar (changeDate)="changeDate($event)" [calorieInfo]="nutrientsInfoForWeightGain$ | async" (open)="openSection($event)" [date]="date" [items]="schedule$"></calendar>
            <assign-plan *ngIf="openModalForMeal" [user]="userInfo" [meals]="items$" [suggestMeals]="suggestMeals$" (add)="createScheduleData($event)" (ownMeal)="createScheduleData($event)" [type]="type$" (close)="closeModal()" (filter)="filterBy($event)"></assign-plan>
            <assign-workout *ngIf="openModalForWorkout" [user]="userInfo" [workouts]="workouts$" (add)="createScheduleData($event)" (close)="closeModal()" (filter)="filterBy($event)" [type]="type$" ></assign-workout>
            
          <!--  <div *ngFor="let schedule of type$ | async">{{ schedule$ | json }}</div>-->
            
          <!--  {{ schedule$ | json }} -->
           
        </div>
    `
})

export class SchedulePlanComponent implements OnInit, OnDestroy{


    
    private depositCollection: AngularFirestoreCollection<any>;
    deposits: Observable<any>;

    constructor(
        public spService: SchedulePlanService,
        private mpService: MealPlanService,
        private store: Store<AppState>,
        private mrService: MealRecipeService,
        private wgService: WorkoutGuideService,
        public afs: AngularFirestore,
        private uiService: UserInfoService,
        private niService: NutritionInfoService
    ){
       // const test = afs.collection('meal-recipes').doc('ingredients');
        this.depositCollection = afs.collection('meal-recipes');
        this.deposits = this.depositCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            
            return { id, ...data };
        }))
        );
        console.log(this.deposits);

        
        
    }

    sub: Subscription[] = [];
    //sub: Subscription;
    date$:Observable<Date>;
    type$: Observable<any>;
    meals: Observable<any>;
    

    workouts$;
    items$;
    userInfo ;
  
    usersCollection:AngularFirestoreCollection<any>;;

    schedule$: any[];
    //schedule$: Observable<any>;
    suggestMeals$;
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
            this.mrService.filterItems$.subscribe(y => this.items$ = y),
            this.wgService.filterItems$.subscribe(x => this.workouts$ = x),
            this.spService.userInfo$.subscribe(x => this.userInfo = x),
            this.mpService.suggestedMeal$.subscribe(x => this.suggestMeals$ = x)
            // this.spService.scheule$.subscribe({
            //     next: (v) => console.log(v)
            // })

            
        ];
        
        this.meals = this.mpService.getRecipes();
       
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
        console.log(event);
    }

    createScheduleData(items: string[]) {
        this.spService.addScheduleItem(items);
        this.closeModal();
    }

    filterBy(event){
        return this.mrService.filterByItem(event);
    }

} 