import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SchedulePlanModule } from './schedule-plan/schedule-plan.module';

export const ROUTES: Routes = [
    { path: 'user', children: [
        {
            path: 'schedule-plan', loadChildren: () => SchedulePlanModule
        }
    ]}
]

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        SchedulePlanModule,
        CommonModule,
    ],
    declarations: [

    ]
})

export class ClientModule{}