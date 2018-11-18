import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './containers/user-info/user-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES : Routes = [
    { path: '', component: UserInfoComponent }
]

@NgModule({
   imports: [
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        CommonModule
   ],
   declarations:[
        UserInfoComponent
   ]
})

export class UserInfoModule{}