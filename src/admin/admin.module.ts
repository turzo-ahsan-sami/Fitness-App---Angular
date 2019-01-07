import { WorkoutProgramModule1 } from './workout-program/workout-program.module';
import { SharedModule } from './shared/shared.module';
import { AdminGuard } from './../auth/shared/guards/admin.guard';
import { MealRecipeListComponent } from './meal-recipe/containers/meal-recipe-list/meal-recipe-list.component';
import { MealRecipeModule } from './meal-recipe/meal-recipe.module';
import { MealRecipeService } from './meal-recipe/services/meal-recipe.service';
import { WorkoutGuideFormComponent } from './workout-guide/components/workout-guide/workout-guide-form.component';
import { WorkoutGuideComponent } from './workout-guide/containers/workout-guide.component/workout-guide.component';
import { WorkoutTypeComponent } from './workout-guide/components/workout-type/workout-type.component';
import { MealRecipeFormComponent } from './meal-recipe/components/meal-recipe-form/meal-recipe-form.component';
import { MealRecipeComponent } from './meal-recipe/containers/meal-recipe/meal-recipe.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutGuideModule } from './workout-guide/workout-guide.module';
import { NutritionInfoModule } from './nutrition-info/nutrition-info.module';

export const ROUTES: Routes = [
  {
    path: 'admin', children: [
      { path: 'meal-recipe', canActivate: [AdminGuard], loadChildren: './meal-recipe/meal-recipe.module#MealRecipeModule' },
      { path: 'workout-guide', canActivate: [AdminGuard], loadChildren: './workout-guide/workout-guide.module#WorkoutGuideModule' },
      { path: 'nutrition-info', canActivate: [AdminGuard], loadChildren: './nutrition-info/nutrition-info.module#NutritionInfoModule' },
      { path: 'workout-program', canActivate: [AdminGuard], loadChildren: './workout-program/workout-program.module#WorkoutProgramModule1' }  
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    MealRecipeModule,
    WorkoutGuideModule,
    NutritionInfoModule,
    SharedModule,
    WorkoutProgramModule1
  ],
  declarations: [
    
    
  ],
  exports:[
    MealRecipeComponent,
    MealRecipeListComponent,
    MealRecipeFormComponent,
    WorkoutGuideFormComponent,
    WorkoutGuideComponent,
    WorkoutTypeComponent
  ],
  providers:[
    MealRecipeService
  ]
})

export class AdminModule { 

  
  
}