import { SharedModule } from './shared/shared.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../environments/environment';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AngularFireAuthModule } from '@angular/fire/auth';

export const ROUTES: Routes = [
    {
        path: 'secure', children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', loadChildren: () => LoginModule },
            { path: 'register', loadChildren: () => RegisterModule }
        ]
    }
    
]
@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,   
        SharedModule
    ],
    declarations:[
        
    ]
})

export class AuthModule{}