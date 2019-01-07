import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Containers
import { AppComponent } from './app.component';

//Feature Modules
import { SharedUIModule } from './../shared-UI/sharedUI.module';
import { AuthModule } from 'src/auth/auth.module';
import { AdminModule } from './../admin/admin.module';
import { ClientModule } from 'src/client/client.module';

//Components
import { AppSidebar } from './components/app-sidebar/app-sidebar.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user/schedule-plan' },
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSidebar,
    AdminSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AdminModule,
    RouterModule.forRoot(ROUTES),
    SharedUIModule,
    ClientModule,
    StoreDevtoolsModule.instrument({
     
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
