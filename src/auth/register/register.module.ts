import { SharedModule } from './../shared/shared.module';
import { RegisterComponent } from './containers/register.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export const ROUTES: Routes = [
    { 
        path: '', component: RegisterComponent 
    }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        RegisterComponent
    ]
})

export class RegisterModule{

}