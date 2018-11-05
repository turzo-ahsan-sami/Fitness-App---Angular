import { MealRecipeListComponent } from './containers/meal-recipe-list/meal-recipe-list.component';
import { MealRecipeFormComponent } from './components/meal-recipe-form/meal-recipe-form.component';
import { MealRecipeComponent } from './containers/meal-recipe/meal-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListItemsComponent } from '../shared/components/list-items/list-items.component';

export const ROUTES: Routes = [
    { path: 'create', component: MealRecipeComponent },
    { path: '', component: MealRecipeListComponent }
  ];

@NgModule({
    imports:[
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations:[
        MealRecipeComponent,
        MealRecipeFormComponent,
        MealRecipeListComponent,
        ListItemsComponent
    ],
    exports: [
        MealRecipeComponent,
        MealRecipeFormComponent,
        MealRecipeListComponent,
        ListItemsComponent
    ]

})

export class MealRecipeModule{

}