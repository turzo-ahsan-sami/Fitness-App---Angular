import { AdminGuard } from './guards/admin.guard';
import { RouterGuard } from './guards/router.guard';
import { AuthenticationService } from './services/authentication.service';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from "@angular/core";

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

export class SharedModule{
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                RouterGuard,
                AuthenticationService,
                AdminGuard
            ]
        };
    }
}