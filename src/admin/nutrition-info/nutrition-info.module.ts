import { SharedUIModule } from './../../shared-UI/sharedUI.module';
import { SharedModule } from './../shared/shared.module';
import { NutritionInfoListComponent } from './containers/nutrition-info-list/nutrition-info-list.component';
import { NutritionInfoService } from './services/nutrition-info.service';
import { NutritionInfoFormComponent } from './components/nutrition-info-form/nutrition-info-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NutritionInfoComponent } from './containers/nutrition-info/nutrition-info.component';

export const ROUTES: Routes = [
   // { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: NutritionInfoListComponent },
    { path: 'create', component: NutritionInfoComponent },
    { path: ':id', component: NutritionInfoComponent }
];

@NgModule({
    imports:[
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedUIModule,
        SharedModule
    ],
    declarations:[
        NutritionInfoComponent,
        NutritionInfoFormComponent,
        NutritionInfoListComponent
    ],
    providers: [
        NutritionInfoService
    ],
    exports: [
    
    ]

})

export class NutritionInfoModule{

}