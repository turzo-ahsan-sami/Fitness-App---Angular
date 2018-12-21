import { RouterGuard } from './../auth/shared/guards/router.guard';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SchedulePlanModule } from './schedule-plan/schedule-plan.module';
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
    { path: 'user', children: [
        {
            path: 'schedule-plan', canActivate: [RouterGuard], loadChildren: './schedule-plan/schedule-plan.module#SchedulePlanModule'
        },
        {
            path: 'info', canActivate: [RouterGuard], loadChildren: './user-info/user-info.module#UserInfoModule'
        },
        {
            path: 'suggestion', canActivate: [RouterGuard], loadChildren: './user-info/user-info.module#UserInfoModule'
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