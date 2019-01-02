import { WorkoutProgramComponent } from './containers/workout-program/workout-program.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SharedUIModule } from 'src/shared-UI/sharedUI.module';
import { WorkoutDetailsProgramComponent } from './components/workoutDetails-program/workoutDetails-program.component';
import { TrainingProgramService } from './services/training-program.service';

export const ROUTES: Routes = [
    {
        path: '', component: WorkoutProgramComponent
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        SharedUIModule
    ],
    declarations: [
        WorkoutProgramComponent,
        WorkoutDetailsProgramComponent
    ],
    providers: [
        TrainingProgramService
    ]
})

export class TrainingProgramModule{}