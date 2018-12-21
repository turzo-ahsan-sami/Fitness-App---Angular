// import { AuthFormComponent } from './auth-form.component';
// import {TestBed, ComponentFixture} from '@angular/core/testing';
// import {ReactiveFormsModule, FormsModule} from "@angular/forms";




// describe('Component: Login', () => {

//     let component: AuthFormComponent;
//     let fixture: ComponentFixture<AuthFormComponent>;
  
//     beforeEach(() => {
//       TestBed.configureTestingModule({
//         imports: [ReactiveFormsModule, FormsModule], 
//         declarations: [AuthFormComponent]
//       });

//       fixture = TestBed.createComponent(AuthFormComponent);
  
     
//       component = fixture.componentInstance;
    
//     });

//     it('form invalid when empty', () => {
//         expect(component.form.valid).toBeFalsy();
//     });

//     it('email field validity', () => {
//         let errors = {};
//         let email = component.form.controls['email'];
//         expect(email.valid).toBeFalsy();
    
//         errors = email.errors || {};
//         expect(errors['required']).toBeTruthy();
    
//         email.setValue("test");
//         errors = email.errors || {};
//         expect(errors['required']).toBeFalsy();
//         expect(errors['pattern']).toBeTruthy();
    
//         email.setValue("test@example.com");
//         errors = email.errors || {};
//         expect(errors['required']).toBeFalsy();
//         expect(errors['pattern']).toBeFalsy();
//     });
    
//     it('password field validity', () => {
//         let errors = {};
//         let password = component.form.controls['password'];
    
//         errors = password.errors || {};
//         expect(errors['required']).toBeTruthy();
    
//         password.setValue("123456");
//         errors = password.errors || {};
//         expect(errors['required']).toBeFalsy();
//         expect(errors['minlength']).toBeTruthy();
    
//         password.setValue("123456789");
//         errors = password.errors || {};
//         expect(errors['required']).toBeFalsy();
//         expect(errors['minlength']).toBeFalsy();
//       });
    
//       it('submitting a form emits a user', () => {
//         expect(component.form.valid).toBeFalsy();
//         component.form.controls['email'].setValue("test@test.com");
//         component.form.controls['password'].setValue("123456789");
//         expect(component.form.valid).toBeTruthy();
    
//         let user: any;
//         component.submitted.subscribe((value) => user = value);
    
//         component.submitForm();

//         expect(user.email).toBe("test@test.com");
//         expect(user.password).toBe("123456789");
//       });
//   });
  