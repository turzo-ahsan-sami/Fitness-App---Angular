import { WorkoutProgramListComponent } from './containers/workout-program-list/workout-program-list.component';
import { SharedUIModule } from './../../shared-UI/sharedUI.module';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutProgramComponent } from './containers/workout-program/workout-program.component';
import { WorkoutProgramFormComponent } from './components/workout-program-form/workout-program-form.component';
import { WorkoutProgramService } from './services/workout-program.service';


export const ROUTES: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: WorkoutProgramListComponent },
    { path: 'create', component: WorkoutProgramComponent },
    { path: ':id', component: WorkoutProgramComponent }
];

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        SharedUIModule,
        SharedModule
    ],
    declarations:[
        WorkoutProgramComponent,
        WorkoutProgramListComponent,
        WorkoutProgramFormComponent
    ],
    providers: [
        WorkoutProgramService
    ],
})

export class WorkoutProgramModule1{

}