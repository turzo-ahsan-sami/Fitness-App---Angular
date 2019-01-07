import { WorkoutProgressService } from './../workout-progress/services/workout-progress.service';
import { TrainingProgramService } from './../training-program/services/training-program.service';
import { FilterTypeComponent } from './filter-type/filter-type.component';
import { DataListComponent } from './data-list/data-list.component';
import { SchedulePlanService } from './../schedule-plan/services/schedule-plan.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { UserInfoService } from '../user-info/services/user-info.service';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        AngularFireDatabaseModule,
    ],
    declarations: [
        DataListComponent,
        FilterTypeComponent
    ],
    exports: [
        DataListComponent,
        FilterTypeComponent
    ]
})

export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return{
            ngModule: SharedModule,
            providers: [
               SchedulePlanService,
               UserInfoService,
               TrainingProgramService,
               WorkoutProgressService
            ]
        }
    }
}