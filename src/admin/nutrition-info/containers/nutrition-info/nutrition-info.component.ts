import { NutritionInfoService } from './../../services/nutrition-info.service';
import { Component } from "@angular/core";

@Component({
    selector: 'nutrition-info',
    styleUrls: ['nutrition-info.component.scss'],
    template: `
        <div>
            <nutrition-info-form (create)="createItem($event)" (update)="update($event)"></nutrition-info-form>
        </div>
    
    `
})

export class NutritionInfoComponent{
    constructor(
        private nutritionInfoService: NutritionInfoService
    ){

    }

    createItem(event: any){
        this.nutritionInfoService.createNutritionInfo(event);
    }

    update(event: any){
        console.log(event);
    }
}