import { WorkoutGuideModule } from './../../admin/workout-guide/workout-guide.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { AssignPlanComponent } from './components/assign-plan/assign-plan.component';
import { SectionPlanComponent } from './components/section-plan/section-plan.component';
import { ControlDaysComponent } from './components/control-days/control-days.component';
import { SchedulePlanService } from './services/schedule-plan.service';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SchedulePlanComponent } from './containers/schedule-plan/schedule-plan.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CreateMealComponent } from './components/create-meal/create-meal.component';
import { CreateWorkoutComponent } from './components/create-workout/create-workout.component';

export const ROUTES: Routes = [
    {
        path: '', component: SchedulePlanComponent
    }
]
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        WorkoutGuideModule
    ],
    declarations: [
        SchedulePlanComponent,
        CalendarComponent,
        ControlDaysComponent,
        SectionPlanComponent,
        AssignPlanComponent,
        CreateMealComponent,
        CreateWorkoutComponent
    ],
    providers: [
        
    ]
})

export class SchedulePlanModule{}