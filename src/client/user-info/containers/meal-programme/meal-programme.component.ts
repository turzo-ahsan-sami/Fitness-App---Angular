import { NutritionInfoService } from '../../../../admin/nutrition-info/services/nutrition-info.service';
import { Observable, Subscription } from 'rxjs';
import { OnInit, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';

@Component({
    selector: 'meal-programme',
    styleUrls: ['meal-programme.component.scss'],
    template: `
        <div *ngIf="user$ | async as user">
            <div class="meal-section">
                <div *ngIf="nutrientsInfoForWeightGain$ | async as nutrientsInfoForWeightGain">
                    <h3>Eating the right food</h3>
                    {{ nutrientsInfoForWeightGain.title }}

                    <div>
                        {{ nutrientsInfoForWeightGain.nutritionDescription }}
                    </div>

                    <div>
                        Your Macro's
                        <table id="meal-plan" *ngFor="let marcos of nutrientsInfoForWeightGain.marcos">
                            <tr>
                                <th>Protein</th>
                                <th>Carbs</th>
                                <th>Fats</th>
                                <th>Calories</th>
                            </tr>
                            <tr>
                                <td>{{ marcos.protein }}</td>
                                <td>{{ marcos.carbs }}</td>
                                <td>{{ marcos.fats }}</td>
                                <td>{{ marcos.calories }}</td>
                            </tr>
                        </table>
                    </div>

                    <div>
                        <h3>Products for Muscle Food</h3>
                        <ul>
                            <li *ngFor="let foodType of nutrientsInfoForWeightGain.foodProducts">
                                {{ foodType }}
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Supplements Suggestion</h3>
                        <div *ngFor="let supplement of nutrientsInfoForWeightGain.supplements">
                            <h5>{{ supplement.supplementsName }}</h5>
                            <ul>
                                <li>
                                    {{ supplement.supplementsDescription }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    `
})

export class MealProgrammeComponent implements OnInit {
    constructor(
        private uiService: UserInfoService,
        private niService: NutritionInfoService
    ){}

    user$: Observable<any>;
    //nutrientsInfoForWeightGain$: Observable<any>;
    nutrientsInfoForWeightGain$;
    subscription: Subscription;

    ngOnInit(){
        this.user$ = this.uiService.userInfo$;
        //this.subscription = this.niService.testing$.subscribe();
        //this.nutrientsInfoForWeightGain$ = this.niService.bodyType;
        this.nutrientsInfoForWeightGain$ = this.niService.bodyType$;
    }

    // ngAfterViewInit(){
    //     //this.uiService.getUserInfo();
    //     this.uiService.userInfo$;
    // }

}