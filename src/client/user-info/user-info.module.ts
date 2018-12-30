import { SharedUIModule } from './../../shared-UI/sharedUI.module';
import { WorkoutProgressService } from './services/workout-progress.service';
import { WorkoutProgressComponent } from './containers/workout-progress/containers/workout-progress.component';
import { WorkoutProgrammeComponent } from './containers/workout-programme/workout-programme.component';
import { UserInfoService } from './services/user-info.service';
import { UserInfoFormComponent } from './components/userInfo-form/userInfo-form.component';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './containers/user-info/user-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealProgrammeComponent } from './containers/meal-programme/meal-programme.component';
import { TrainingProgramService } from './services/training-program.service';
import { FormsModule } from '@angular/forms'; 

export const ROUTES : Routes = [
    { path: '', component: UserInfoComponent },
    { path: 'meal-programme', component: MealProgrammeComponent },
    { path: 'workout-programme', component: WorkoutProgrammeComponent },
    { path: 'workout-progress', component: WorkoutProgressComponent }
]

@NgModule({
   imports: [
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        CommonModule,
        SharedUIModule,
        FormsModule
   ],
   declarations:[
        UserInfoComponent,
        UserInfoFormComponent,
        MealProgrammeComponent,
        WorkoutProgrammeComponent,
        WorkoutProgressComponent
   ],
   providers: [
       UserInfoService,
       TrainingProgramService,
       WorkoutProgressService
   ]
})

export class UserInfoModule{}