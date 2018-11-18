import { SchedulePlanService } from './../schedule-plan/services/schedule-plan.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MealPlanService } from './../meal-plan/services/meal-plan.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from "@angular/core";

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        AngularFireDatabaseModule
    ],
    declarations: [

    ]
})

export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return{
            ngModule: SharedModule,
            providers: [
                MealPlanService,
                SchedulePlanService
            ]
        }
    }
}