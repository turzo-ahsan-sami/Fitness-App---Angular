import { RouterGuard } from './../auth/shared/guards/router.guard';
import { MealPlanModule } from './meal-plan/meal-plan.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SchedulePlanModule } from './schedule-plan/schedule-plan.module';
import { SharedModule } from './shared/shared.module';
import { UserInfoModule } from './user-info/user-info.module';

export const ROUTES: Routes = [
    { path: 'user', children: [
        {
            path: 'schedule-plan', canActivate: [RouterGuard], loadChildren: () => SchedulePlanModule
        },
        {
            path: 'meal-list', loadChildren: () => MealPlanModule
        },
        {
            path: 'info', canActivate: [RouterGuard], loadChildren: () => UserInfoModule
        },
        {
            path: 'suggestion', loadChildren: () => UserInfoModule
        }
    ]}
]

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        SchedulePlanModule,
        CommonModule,
        SharedModule.forRoot()
    ],
    declarations: [

    ]
})

export class ClientModule{}