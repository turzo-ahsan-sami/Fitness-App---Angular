import { DataListComponent } from './data-list/data-list.component';
import { SchedulePlanService } from './../schedule-plan/services/schedule-plan.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MealPlanService } from './../meal-plan/services/meal-plan.service';
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
        DataListComponent
    ],
    exports: [
        DataListComponent
    ]
})

export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return{
            ngModule: SharedModule,
            providers: [
                MealPlanService,
                SchedulePlanService,
                UserInfoService
            ]
        }
    }
}