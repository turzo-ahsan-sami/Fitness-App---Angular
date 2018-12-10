import { NutritionInfoService } from './../../../../admin/nutrition-info/services/nutrition-info.service';
import { Observable, Subscription } from 'rxjs';
import { OnInit, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';

@Component({
    selector: 'suggestion-plan',
    styleUrls: ['suggestion-plan.component.scss'],
    template: `
        <div *ngIf="user$ | async as user">
            <div class="meal-section" *ngIf="user.bodyType == 'weight-gain'">
                <div>
                    <h3>Eating the right food</h3>
                    <h5>Carbs</h5>
                    <p><p>
                </div>

                Your Macro's
                <table id="meal-plan">
                    <tr>
                        <th>Protein</th>
                        <th>Carbs</th>
                        <th>Fats</th>
                        <th>Calories</th>
                    </tr>
                    <tr>
                        <td>185g</td>
                        <td>325g</td>
                        <td>60g</td>
                        <td>2840</td>
                    </tr>
                </table>

                Products from Muscle Food:
                <ul>
                    <li>Chicken</li>
                    <li>Turkey</li>
                    <li>Lean Beef Mince</li>
                    <li>Walden Farms Zero Everything Syrup</li>
                </ul>

                Products from Supermarket:
                <ul>
                    <li>Rice cakes</li>
                    <li>Eggs</li>
                    <li>Oats</li>
                    <li>Meat Fridge Packets</li>
                </ul>
            </div>

            <div *ngIf="user.bodyType == 'weight-gain'">
                Supplements Suggestion
                <p>Whey Protein</p>
                <span>Helps prevent muscle breakdown/ aids daily protein intake/ contribute to muscle growth and recovery</span>    
            </div>

            <div *ngIf="user.bodyType == 'weight-gain' && user.exerciseDaysAWeek == '1'">
                This workout is for your availability but to gain weight here is perfect plan to at least spend five days. 
            </div>

            <div *ngIf="user.bodyType == 'weight-gain' && user.exerciseDaysAWeek == '2-3'">
                This workout is for you.
            </div>
        </div>
        
        <div *ngIf="nutrientsInfoForWeightGain$ | async as nutrientsInfoForWeightGain">
            hYE
            {{ nutrientsInfoForWeightGain.title }}
           
        </div>
       
    `
})

export class SuggestionPlanComponent implements OnInit {
    constructor(
        private uiService: UserInfoService,
        private niService: NutritionInfoService
    ){}

    user$: Observable<any>;
    nutrientsInfoForWeightGain$;
    subscription: Subscription;

    ngOnInit(){
        this.user$ = this.uiService.userInfo$;
        //this.subscription = this.niService.testing$.subscribe();
        this.nutrientsInfoForWeightGain$ = this.niService.bodyType;
    }

    // ngAfterViewInit(){
    //     //this.uiService.getUserInfo();
    //     this.uiService.userInfo$;
    // }

}