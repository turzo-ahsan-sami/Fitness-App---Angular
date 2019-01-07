import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../environments/environment';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './shared/store/reducers/auth.reducer';
import { schedulePlanReducer } from 'src/client/schedule-plan/store/reducers/schedule-plan.reducer';

export const ROUTES: Routes = [
    {
        path: 'secure', children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', loadChildren: './login/login.module#LoginModule' },
            { path: 'register', loadChildren: './register/register.module#RegisterModule' }
        ]
    }
    
]
@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,   
        SharedModule.forRoot(),
        StoreModule.forRoot({
            user: authReducer,
            schedule: schedulePlanReducer
        }),
        
        // EffectsModule.forRoot([
        //     UserEffects
        // ]),
    ],
    declarations:[
        
    ]
})

export class AuthModule{}