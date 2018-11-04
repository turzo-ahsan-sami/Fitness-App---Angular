import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';
import { WorkoutGuideComponent } from './containers/workout-guide.component.ts/workout-guide.component';
import { WorkoutGuideFormComponent } from './components/workout-guide/workout-guide-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports:[
        CommonModule,
        ReactiveFormsModule
    ],
    declarations:[
        // WorkoutGuideFormComponent,
        // WorkoutGuideComponent,
        // WorkoutTypeComponent
    ]
})

export class WorkoutGuideModule{

}