import { FormsModule } from '@angular/forms';
import { SharedUIModule } from 'src/shared-UI/sharedUI.module';
import { WorkoutProgressComponent } from './containers/workout-progress/workout-progress.component';

import { WorkoutProgressService } from './services/workout-progress.service';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

export const ROUTES: Routes = [
    { path: '', component: WorkoutProgressComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedUIModule,
        FormsModule
    ],
    declarations: [
        WorkoutProgressComponent
    ],
    providers: [
       // WorkoutProgressService
    ]
})

export class WorkoutProgressModule{

}