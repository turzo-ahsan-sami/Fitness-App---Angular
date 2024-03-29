import { SharedModule } from './../shared/shared.module';
import { SharedUIModule } from './../../shared-UI/sharedUI.module';
import { MealRecipeListComponent } from './containers/meal-recipe-list/meal-recipe-list.component';
import { MealRecipeFormComponent } from './components/meal-recipe-form/meal-recipe-form.component';
import { MealRecipeComponent } from './containers/meal-recipe/meal-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: MealRecipeListComponent },
    { path: 'create', component: MealRecipeComponent },
    { path: ':id', component: MealRecipeComponent }
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
        MealRecipeComponent,
        MealRecipeFormComponent,
        MealRecipeListComponent,
        
    ],
    exports: [
        MealRecipeComponent,
        MealRecipeFormComponent,
        MealRecipeListComponent,
        
    ]

})

export class MealRecipeModule{

}