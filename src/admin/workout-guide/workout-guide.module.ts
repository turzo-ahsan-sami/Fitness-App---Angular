import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';
import { WorkoutGuideComponent } from './containers/workout-guide.component.ts/workout-guide.component';
import { WorkoutGuideFormComponent } from './components/workout-guide/workout-guide-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { WorkoutGuideService } from './services/workoutguide.service';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
   // { path: 'list', component: MealRecipeListComponent },
    { path: 'create', component: WorkoutGuideComponent },
    { path: ':id', component: WorkoutGuideComponent }
];

@NgModule({
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations:[
        WorkoutGuideFormComponent,
        WorkoutGuideComponent,
        WorkoutTypeComponent
    ],
    exports: [
        WorkoutGuideFormComponent,
        WorkoutGuideComponent,
        WorkoutTypeComponent
    ],
    providers: [
        WorkoutGuideService
    ]
})

export class WorkoutGuideModule{

}