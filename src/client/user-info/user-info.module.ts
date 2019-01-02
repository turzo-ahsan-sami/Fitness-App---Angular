import { UserInfoEditFormComponent } from './components/userInfo-editForm/userInfo-editForm.component';
import { SharedUIModule } from './../../shared-UI/sharedUI.module';

import { UserInfoService } from './services/user-info.service';
import { UserInfoFormComponent } from './components/userInfo-form/userInfo-form.component';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './containers/user-info/user-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms'; 
import { UserInfoEditComponent } from './containers/userInfo-edit/userInfo-edit.component';

export const ROUTES : Routes = [
    { path: '', component: UserInfoComponent },
    { path: 'edit', component: UserInfoEditComponent }
]

@NgModule({
   imports: [
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        CommonModule,
        SharedUIModule,
        FormsModule
   ],
   declarations:[
        UserInfoComponent,
        UserInfoFormComponent,
        UserInfoEditComponent,
        UserInfoEditFormComponent
   ],
   providers: [
       UserInfoService,
   ]
})

export class UserInfoModule{}