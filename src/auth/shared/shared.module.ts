import { AuthenticationService } from './services/authentication.service';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        AuthFormComponent
    ],
    exports: [
        AuthFormComponent
    ],
    providers: [
        AuthenticationService
    ]
    
})

export class SharedModule{}