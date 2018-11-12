import { MealRecipeModule } from 'src/admin/meal-recipe/meal-recipe.module';
import { Routes, RouterModule } from '@angular/router';
import { AdminModule } from './../admin/admin.module';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from 'src/auth/auth.module';
import { ClientModule } from 'src/client/client.module';
import { AppSidebar } from './components/app-sidebar/app-sidebar.component';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'meal-recipe' }
];


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSidebar
  ],
  imports: [
    BrowserModule,
    AdminModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    ClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
