import { WorkoutProgramModule } from './workout-program/workout-program.module';
import { SharedModule } from './shared/shared.module';
import { AdminGuard } from './../auth/shared/guards/admin.guard';
import { ListItemsComponent } from './shared/components/list-items/list-items.component';
import { MealRecipeListComponent } from './meal-recipe/containers/meal-recipe-list/meal-recipe-list.component';
import { MealRecipeModule } from './meal-recipe/meal-recipe.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MealRecipeService } from './meal-recipe/services/meal-recipe.service';
import { WorkoutGuideFormComponent } from './workout-guide/components/workout-guide/workout-guide-form.component';
import { WorkoutGuideComponent } from './workout-guide/containers/workout-guide.component/workout-guide.component';
import { WorkoutTypeComponent } from './workout-guide/components/workout-type/workout-type.component';
import { MealRecipeFormComponent } from './meal-recipe/components/meal-recipe-form/meal-recipe-form.component';
import { environment } from './../environments/environment';
import { MealRecipeComponent } from './meal-recipe/containers/meal-recipe/meal-recipe.component';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutGuideModule } from './workout-guide/workout-guide.module';
import { NutritionInfoModule } from './nutrition-info/nutrition-info.module';

export const ROUTES: Routes = [
  { path: 'admin/meal-recipe', canActivate: [AdminGuard], loadChildren: () => MealRecipeModule },
  { path: 'admin/workout-guide', canActivate: [AdminGuard], loadChildren: () => WorkoutGuideModule },
  { path: 'admin/nutrition-info', canActivate: [AdminGuard], loadChildren: () => NutritionInfoModule },
  { path: 'admin/workout-program', canActivate: [AdminGuard], loadChildren: () => WorkoutProgramModule }   
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
    WorkoutProgramModule
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