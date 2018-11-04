import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MealRecipeService } from './meal-recipe/services/meal-recipe.service';
import { WorkoutGuideFormComponent } from './workout-guide/components/workout-guide/workout-guide-form.component';
import { WorkoutGuideComponent } from './workout-guide/containers/workout-guide.component.ts/workout-guide.component';
import { WorkoutTypeComponent } from './workout-guide/components/workout-type/workout-type.component';
import { MealRecipeFormComponent } from './meal-recipe/components/meal-recipe-form/meal-recipe-form.component';
import { environment } from './../environments/environment';
import { MealRecipeComponent } from './meal-recipe/containers/meal-recipe/meal-recipe.component';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    MealRecipeComponent,
    MealRecipeFormComponent,
    WorkoutGuideFormComponent,
    WorkoutGuideComponent,
    WorkoutTypeComponent
  ],
  exports:[
    MealRecipeComponent,
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