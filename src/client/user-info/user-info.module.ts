import { UserInfoService } from './services/user-info.service';
import { UserInfoFormComponent } from './components/userInfo-form/userInfo-form.component';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './containers/user-info/user-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionPlanComponent } from './containers/suggestion-plan/suggestion-plan.component';

export const ROUTES : Routes = [
    { path: '', component: UserInfoComponent },
    { path: 'plan', component: SuggestionPlanComponent }
]

@NgModule({
   imports: [
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        CommonModule,
   ],
   declarations:[
        UserInfoComponent,
        UserInfoFormComponent,
        SuggestionPlanComponent
   ],
   providers: [
       UserInfoService
   ]
})

export class UserInfoModule{}