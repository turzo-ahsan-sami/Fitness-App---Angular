import { NutritionInfoService } from './../../services/nutrition-info.service';
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';

@Component({
    selector: 'nutrition-info-list',
    styleUrls: ['nutrition-info-list.component.scss'],
    template: `
        <div class="nutrition-info-list">
            <div class="nutrition-info-list__link">
                <a [routerLink]="['../create']">Create + </a>
            </div>
        
            <div class="nutrition-info-list__items" *ngIf="items | async as items; else fetching;">
                <list-items [items]="items" (remove)="RemoveRecipe($event)"></list-items>
            </div>
        </div>
        <ng-template #fetching>
            <div class="message">
                <spinning-icon></spinning-icon>
            </div>
        </ng-template>
    `
})

export class NutritionInfoListComponent implements OnInit{ 
    
    items: Observable<any[]>;
    
    constructor(
        private niService: NutritionInfoService,
    ){}

    ngOnInit(){
        this.items = this.niService.getNutritionList();
    }

    RemoveRecipe(key: any){
        this.niService.deleteNutrition(key);
    }

}