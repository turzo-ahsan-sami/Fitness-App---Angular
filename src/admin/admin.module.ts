import { MealRecipeFormComponent } from './meal-recipe/components/meal-recipe-form/meal-recipe-form.component';
import { environment } from './../environments/environment';
import { MealRecipeComponent } from './meal-recipe/containers/meal-recipe.component';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
      MealRecipeComponent,
      MealRecipeFormComponent
  ],
  exports:[
    MealRecipeComponent,
    MealRecipeFormComponent
  ]
})

export class AdminModule { 

  
  
}