import { RegisterModule } from './../auth/register/register.module';
import { LoginModule } from './../auth/login/login.module';
import { Routes } from '@angular/router';


export const rootRouterConfig: Routes = [
    { path: 'secure', pathMatch: 'full', redirectTo: 'secure/login' },
    { path: 'secure/login', component: LoginModule },
    { path: 'secure/register', component: RegisterModule },
   
];