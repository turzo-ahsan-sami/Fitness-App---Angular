import { WorkoutGuideFormComponent } from './workout-guide-form.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import { WorkoutTypeComponent } from '../workout-type/workout-type.component';

describe('Component: WorkoutGuideForm', () => {

    let component: WorkoutGuideFormComponent;
    let fixture: ComponentFixture<WorkoutGuideFormComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, RouterTestingModule], 
        declarations: [WorkoutGuideFormComponent, WorkoutTypeComponent]
      });

      fixture = TestBed.createComponent(WorkoutGuideFormComponent);
     
      component = fixture.componentInstance;
    
    });

    it('name field validity', () => {
        let errors = {};
        let name = component.form.controls['name'];
        expect(name.valid).toBeFalsy();
    
        errors = name.errors || {};
        expect(errors['required']).toBeTruthy();
    
        name.setValue("");
        errors = name.errors || {};
        expect(errors['required']).toBeTruthy();
    
        name.setValue("test");
        errors = name.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('submitting a form emits data', () => {
        expect(component.form.valid).toBeFalsy();
        component.form.controls['name'].setValue("test");
    
        let recipe: any;
        component.create.subscribe((value) => recipe = value);
    
        component.dispatchWorkout();
    
        expect(recipe.name).toBe("test");
    });
    
});
  