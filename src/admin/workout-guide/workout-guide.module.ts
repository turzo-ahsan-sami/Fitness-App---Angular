import { SharedModule } from './../shared/shared.module';
import { SharedUIModule } from './../../shared-UI/sharedUI.module';
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';
import { WorkoutGuideComponent } from './containers/workout-guide.component/workout-guide.component';
import { WorkoutGuideFormComponent } from './components/workout-guide/workout-guide-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { WorkoutGuideService } from './services/workoutguide.service';
import { WorkoutGuideListComponent } from './containers/workout-guide-list.component/workout-guide-list.component';

export const ROUTES: Routes = [
  //  { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: WorkoutGuideListComponent },
    { path: 'create', component: WorkoutGuideComponent },
    { path: ':id', component: WorkoutGuideComponent }
];

@NgModule({
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedUIModule,
        SharedModule
    ],
    declarations:[
        WorkoutGuideFormComponent,
        WorkoutGuideComponent,
        WorkoutTypeComponent,
        WorkoutGuideListComponent
    ],
    exports: [
        WorkoutGuideFormComponent,
        WorkoutGuideComponent,
        WorkoutTypeComponent,
    ],
    providers: [
        WorkoutGuideService
    ],

})

export class WorkoutGuideModule{

}