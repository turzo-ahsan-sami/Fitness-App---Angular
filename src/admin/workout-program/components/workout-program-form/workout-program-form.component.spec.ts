import { WorkoutProgramFormComponent } from './workout-program-form.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import {TestBed, ComponentFixture} from '@angular/core/testing';

describe('Component: WorkoutProgramForm', () => {

    let component: WorkoutProgramFormComponent;
    let fixture: ComponentFixture<WorkoutProgramFormComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, RouterTestingModule], 
        declarations: [WorkoutProgramFormComponent]
      });

      fixture = TestBed.createComponent(WorkoutProgramFormComponent);
     
      component = fixture.componentInstance;
    
    });

    it('title field validity', () => {
        let errors = {};
        let title = component.form.controls['title'];
        expect(title.valid).toBeFalsy();
    
        errors = title.errors || {};
        expect(errors['required']).toBeTruthy();
    
        title.setValue("");
        errors = title.errors || {};
        expect(errors['required']).toBeTruthy();
    
        title.setValue("test");
        errors = title.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('bodyType field validity', () => {
        let errors = {};
        let bodyType = component.form.controls['bodyType'];
        expect(bodyType.valid).toBeFalsy();
    
        errors = bodyType.errors || {};
        expect(errors['required']).toBeTruthy();
    
        bodyType.setValue("");
        errors = bodyType.errors || {};
        expect(errors['required']).toBeTruthy();
    
        bodyType.setValue("test");
        errors = bodyType.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('days field validity', () => {
        let errors = {};
        let days = component.form.controls['days'];
        expect(days.valid).toBeFalsy();
    
        errors = days.errors || {};
        expect(errors['required']).toBeTruthy();
    
        days.setValue("");
        errors = days.errors || {};
        expect(errors['required']).toBeTruthy();
    
        days.setValue("test");
        errors = days.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('description field validity', () => {
        let errors = {};
        let description = component.form.controls['description'];
        expect(description.valid).toBeFalsy();
    
        errors = description.errors || {};
        expect(errors['required']).toBeTruthy();
    
        description.setValue("");
        errors = description.errors || {};
        expect(errors['required']).toBeTruthy();
    
        description.setValue("test");
        errors = description.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('submitting a form emits data', () => {
        expect(component.form.valid).toBeFalsy();
        component.form.controls['title'].setValue("test");
        component.form.controls['bodyType'].setValue("test");
        component.form.controls['days'].setValue("test");
        component.form.controls['description'].setValue("test");
    
        let item: any;
        component.create.subscribe((value) => item = value);
    
        component.createInfo();
    
        expect(item.title).toBe("test");
        expect(item.bodyType).toBe("test");
        expect(item.days).toBe("test");
        expect(item.description).toBe("test");
    });
    
});
  