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

export const ROUTES : Routes = [
    { path: '', component: UserInfoComponent },
    { path: 'meal-programme', component: MealProgrammeComponent },
    { path: 'workout-programme', component: WorkoutProgrammeComponent }
]

@NgModule({
   imports: [
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        CommonModule,
   ],
   declarations:[
        UserInfoComponent,
        UserInfoFormComponent,
        MealProgrammeComponent,
        WorkoutProgrammeComponent
   ],
   providers: [
       UserInfoService,
       TrainingProgramService
   ]
})

export class UserInfoModule{}