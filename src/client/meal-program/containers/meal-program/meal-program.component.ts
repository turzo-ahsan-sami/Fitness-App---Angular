import { Observable, Subscription } from 'rxjs';
import { NutritionInfoService } from './../../../../admin/nutrition-info/services/nutrition-info.service';
import { UserInfoService } from './../../../user-info/services/user-info.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'meal-program',
    styleUrls: ['meal-program.component.scss'],
    template: `
        <div *ngIf="user$ | async as user">
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
        </div>  
        
    `
})

export class MealProgramComponent implements OnInit{
    constructor(
        private uiService: UserInfoService,
        private niService: NutritionInfoService
    ){}

    user$: Observable<any>;

    nutrientsInfoForWeightGain$;
    subscription: Subscription;

    ngOnInit(){
        this.user$ = this.uiService.userInfo$;
        this.nutrientsInfoForWeightGain$ = this.niService.bodyType$;
    }
}