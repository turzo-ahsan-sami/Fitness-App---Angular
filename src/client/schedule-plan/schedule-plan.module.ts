import { ControlDaysComponent } from './components/control-days/control-days.component';
import { SchedulePlanService } from './services/schedule-plan.service';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SchedulePlanComponent } from './containers/schedule-plan/schedule-plan.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '', component: SchedulePlanComponent
    }
]
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        SchedulePlanComponent,
        CalendarComponent,
        ControlDaysComponent
    ],
    providers: [
        SchedulePlanService
    ]
})

export class SchedulePlanModule{}