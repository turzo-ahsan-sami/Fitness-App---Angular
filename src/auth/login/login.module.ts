import { SharedModule } from './../shared/shared.module';
import { ClientLoginComponent } from './containers/client-login/client-login.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

export const ROUTES : Routes = [
    { 
        path: '', component: ClientLoginComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,   
        SharedModule
    ],
    declarations: [
        ClientLoginComponent
    ]
})

export class LoginModule{}