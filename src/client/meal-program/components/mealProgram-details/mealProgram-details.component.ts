import { Input, ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'mealProgram-details',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['mealProgram-details.component.scss'],
    template: `  
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
    `
})

export class MealProgramDetailsComponent{
    @Input() nutrientsInfoForWeightGain: any;
}