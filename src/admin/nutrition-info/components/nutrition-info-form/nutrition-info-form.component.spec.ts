import { NutritionInfoFormComponent } from './nutrition-info-form.component';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import { RouterTestingModule } from '@angular/router/testing';


describe('Component: Nutrition Info Form', () => {

    let component: NutritionInfoFormComponent;
    let fixture: ComponentFixture<NutritionInfoFormComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, RouterTestingModule], 
        declarations: [NutritionInfoFormComponent]
      });

      fixture = TestBed.createComponent(NutritionInfoFormComponent);
     
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
    
    it('nutritionDescription field validity', () => {
        let errors = {};
        let description = component.form.controls['nutritionDescription'];
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
        component.form.controls['nutritionDescription'].setValue("test");
       
        //expect(component.form.invalid).toBeTruthy();
    
        let data: any;
        component.create.subscribe((value) => data = value);
    
        component.dispatchNutritionInfo();
    
        expect(data.title).toBe("test");
        expect(data.bodyType).toBe("test");
        expect(data.nutritionDescription).toBe("test");
    });
    
  });
  