import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { MealListComponent } from './containers/meal-list/meal-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MealDetailComponent } from './containers/meal-detail/meal-detail.component';

export const ROUTES: Routes = [
    {
        path: '', component: MealListComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        MealDetailComponent,
        MealListComponent
    ],
})

export class MealPlanModule{}