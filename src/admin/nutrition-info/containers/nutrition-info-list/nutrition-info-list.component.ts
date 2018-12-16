import { NutritionInfoService } from './../../services/nutrition-info.service';
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';

@Component({
    selector: 'nutrition-info-list',
    styleUrls: ['nutrition-info-list.component.scss'],
    template: `
        <a [routerLink]="['../create']">Create</a>
        <div *ngIf="items | async as items; else fetching;">
            <list-items [items]="items" (remove)="RemoveRecipe($event)"></list-items>
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