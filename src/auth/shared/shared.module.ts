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
    
})

export class SharedModule{}