import { NutritionInfoService } from './../../../../admin/nutrition-info/services/nutrition-info.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'meal-program',
    styleUrls: ['meal-program.component.scss'],
    template: `
        <div class="meal-section">
            <div *ngIf="nutrientsInfoForWeightGain$ | async as nutrientsInfoForWeightGain; else fetching">
                <mealProgram-details [nutrientsInfoForWeightGain]="nutrientsInfoForWeightGain"></mealProgram-details>
            </div>
            <ng-template #fetching>
                <div class="message">
                    <spinning-icon></spinning-icon>
                </div>
            </ng-template>
        </div>
       
        
    `
})

export class MealProgramComponent implements OnInit{
    constructor(
        private niService: NutritionInfoService
    ){}

    nutrientsInfoForWeightGain$;

    ngOnInit(){
        this.nutrientsInfoForWeightGain$ = this.niService.bodyType$;
    }
}