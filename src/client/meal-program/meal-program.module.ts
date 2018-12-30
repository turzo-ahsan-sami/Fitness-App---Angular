import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SharedUIModule } from 'src/shared-UI/sharedUI.module';
import { MealProgramComponent } from './containers/meal-program/meal-program.component';
import { MealProgramDetailsComponent } from './components/mealProgram-details/mealProgram-details.component';

export const ROUTES: Routes = [
    {
        path: '', component: MealProgramComponent
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        SharedUIModule
    ],
    declarations: [
        MealProgramComponent,
        MealProgramDetailsComponent
    ]
})

export class MealProgramModule{}