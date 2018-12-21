import {TestBed, ComponentFixture} from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { MealRecipeFormComponent } from './meal-recipe-form.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('Component: MealRecipeForm', () => {

    let component: MealRecipeFormComponent;
    let fixture: ComponentFixture<MealRecipeFormComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, RouterTestingModule], 
        declarations: [MealRecipeFormComponent]
      });

      fixture = TestBed.createComponent(MealRecipeFormComponent);
     
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

    it('calorie field validity', () => {
        let errors = {};
        let calorie = component.form.controls['calorie'];
        expect(calorie.valid).toBeFalsy();
    
        errors = calorie.errors || {};
        expect(errors['required']).toBeTruthy();
    
        calorie.setValue("");
        errors = calorie.errors || {};
        expect(errors['required']).toBeTruthy();
    
        calorie.setValue("test");
        errors = calorie.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['pattern']).toBeTruthy();

        calorie.setValue(200);
        errors = calorie.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['pattern']).toBeFalsy();
    });
    
    it('protein field validity', () => {
        let errors = {};
        let protein = component.form.controls['protein'];
        expect(protein.valid).toBeFalsy();
    
        errors = protein.errors || {};
        expect(errors['required']).toBeTruthy();
    
        protein.setValue("");
        errors = protein.errors || {};
        expect(errors['required']).toBeTruthy();
    
        protein.setValue("test");
        errors = protein.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('fat field validity', () => {
        let errors = {};
        let fat = component.form.controls['fat'];
        expect(fat.valid).toBeFalsy();
    
        errors = fat.errors || {};
        expect(errors['required']).toBeTruthy();
    
        fat.setValue("");
        errors = fat.errors || {};
        expect(errors['required']).toBeTruthy();
    
        fat.setValue("test");
        errors = fat.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('submitting a form emits data', () => {
        expect(component.form.valid).toBeFalsy();
        component.form.controls['name'].setValue("test");
        component.form.controls['calorie'].setValue(200);
        component.form.controls['fat'].setValue("test");
        component.form.controls['protein'].setValue("test");
       
        expect(component.form.valid).toBeTruthy();
    
        let recipe: any;
        component.create.subscribe((value) => recipe = value);
    
        component.dispatchMeal();
    
        expect(recipe.name).toBe("test");
        expect(recipe.calorie).toBe(200);
        expect(recipe.fat).toBe("test");
        expect(recipe.protein).toBe("test");
      });
    
  });
  