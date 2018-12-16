import { OnChanges } from '@angular/core';
import { Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormControl, FormArray } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'nutrition-info-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['nutrition-info-form.component.scss'],
    template: `
        <div class="nutrition-info-form">
            <form [formGroup]="form" novalidate>

                <div class="input-wrap select-box">
                    <select formControlName="bodyType">
                        <option value="">Select</option>
                        <option *ngFor="let type of bodyType" [value]="type.key">{{ type.value }}</option>
                    </select>
                </div>

                <!-- NUTRITION INFO BLOCK -->

                <div class="nutrition-info-form__row">
                    <div class="col-25">
                        <label>Nutritions Info Title</label>
                    </div>
                    <div class="col-75">
                        <input type="text" formControlName="title">
                    </div>
                </div>

                <div class="nutrition-info-form__row">
                    <div class="col-25">
                        <label>Nutritions Description</label>
                    </div>
                    <div class="col-75">
                        <textarea formControlName="nutritionDescription"></textarea>
                    </div>
                </div>

                <!-- Macro -->
                <div>
                    <div formArrayName="marcos">
                        <h3>Macros</h3>
                        <div *ngFor="let marco of form.get('marcos').controls; let i=index">
                            <div [formGroupName]="i">
                                <div class="nutrition-info-form__row">
                                    <div class="col-25">
                                        <label>Protein</label>
                                    </div>
                                    <div class="col-75">
                                        <input type="text" formControlName="protein">
                                    </div>
                                </div>

                                <div class="nutrition-info-form__row">
                                    <div class="col-25">
                                        <label>Carbs</label>
                                    </div>
                                    <div class="col-75">
                                        <input type="text" formControlName="carbs">
                                    </div>
                                </div>

                                <div class="nutrition-info-form__row">
                                    <div class="col-25">
                                        <label>Fats</label>
                                    </div>
                                    <div class="col-75">
                                        <input type="text" formControlName="fats">
                                    </div>
                                </div>

                                <div class="nutrition-info-form__row">
                                    <div class="col-25">
                                        <label>Calories</label>
                                    </div>
                                    <div class="col-75">
                                        <input type="number" formControlName="calories">
                                    </div>
                                </div>    
                            </div>

                        </div>
                    </div>
                </div>
                <!-- FOOD TYPE SUGGESTION -->

                <div class="nutrition-info-form__row">
                    <div class="col-25">
                        <label>Suggested Food Products</label>
                    </div>
                    <div formArrayName="foodProducts" class="col-75">
                        <label *ngFor="let foodProduct of foodProducts.controls; index as i;">
                            <input type="text" class="instructions" [formControlName]="i">
                        </label>
                        <button class="array" type="button" (click)="addFoodProducts()">+</button>
                    </div>
                </div>

                <!-- Supplements Suggestion -->

                <div>
                    <div formArrayName="supplements">
                        <h3>Supplements</h3>
                        <div *ngFor="let supplement of form.get('supplements').controls; let i=index">
                            <div [formGroupName]="i">
                                <div class="nutrition-info-form__row">
                                    <div class="col-25">
                                        <label>Supplements Name</label>
                                    </div>
                                    <div class="col-75">
                                        <input type="text" formControlName="supplementsName">
                                    </div>
                                </div>

                                <div class="nutrition-info-form__row">
                                    <div class="col-25">
                                        <label>Supplements Description</label>
                                    </div>
                                    <div class="col-75">
                                        <textarea formControlName="supplementsDescription"></textarea>
                                    </div>
                                    <button class="array" type="button" (click)="addSupplements()">+</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="nutrition-info-form__row">
                    <button class="button button--create" type="button" *ngIf="!exists" (click)="dispatchNutritionInfo()">Create</button>
                    <button class="button button--create" type="button" *ngIf="exists" (click)="updateNutritionInfo()">Update</button>
                    <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
                </div>
            </form>
        </div>
    
    `
})

export class NutritionInfoFormComponent implements OnChanges{
    form: FormGroup;

    constructor(
        private fb: FormBuilder
    ){
        this.form = this.fb.group({
            title: ['', Validators.required],
            bodyType: ['', Validators.required],
            nutritionDescription: ['', Validators.required],
            foodProducts: this.fb.array(['']),
            marcos: this.fb.array([
                this.createItem()
            ]),
            supplements: this.fb.array([
                this.createSupplements()
            ])
            
        })
    }

    @Input() doc;
    exists = false;

    ngOnChanges(){
        if (this.doc && this.doc.title) {
            this.exists = true;
            this.emptyFoodProducts();
            this.emptySupplements();

            const value = this.doc;
            this.form.patchValue(value);
            
            if (value.foodProducts) {
                for (const item of value.foodProducts) {
                    this.foodProducts.push(new FormControl(item));
                }
            }
            if (value.supplements) {
                for (const item of value.supplements) {
                   
                    this.supplements.push(this.reAddSupplements(item.supplementsName, item.supplementsDescription));
                }
            }
        }
    }

    createItem(): FormGroup {
        return this.fb.group({
            protein: '',
            carbs: '',
            fats: '',
            calories: ['', Validators.required]
        });
    }

    bodyType = [
        {key: 'weight-gain', value: 'Weight Gain'},
        {key: 'skinny-fat', value: 'Skinny Fat'},
        {key: 'getting-tone', value: 'Getting Tone'},
        {key: 'fat-loss', value: 'Weight Loss'}
     ];

    get foodProducts() {
        return this.form.get('foodProducts') as FormArray;
    }

    addFoodProducts(){
        this.foodProducts.push(new FormControl(''));
    }

    createSupplements() {
        return this.fb.group({
            supplementsName: [''],
            supplementsDescription: ['']
        })
    }

    get supplements() {
        return this.form.get('supplements') as FormArray;
    }

    addSupplements(){    
        this.supplements.push(this.createSupplements());
    }

    @Output() create = new EventEmitter<any>();
    dispatchNutritionInfo(){
        this.create.emit(this.form.value);
        console.log(this.form.value);
    }

    emptyFoodProducts() {
        while(this.foodProducts.controls.length) {
          this.foodProducts.removeAt(0);
        }
    }

    emptySupplements() {
        while(this.supplements.controls.length) {
          this.supplements.removeAt(0);
        }
    }

    reAddSupplements(name, description) {
        return this.fb.group({
            supplementsName: [name],
            supplementsDescription: [description]
        })
    }

    @Output() update = new EventEmitter<any>();
    updateNutritionInfo(){
        this.update.emit(this.form.value);
    }
}