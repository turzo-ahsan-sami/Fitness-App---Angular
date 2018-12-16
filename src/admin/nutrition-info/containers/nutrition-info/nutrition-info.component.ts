import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { NutritionInfoService } from './../../services/nutrition-info.service';
import { Component, OnInit, OnDestroy} from "@angular/core";

@Component({
    selector: 'nutrition-info',
    styleUrls: ['nutrition-info.component.scss'],
    template: `
        <div *ngIf="nutrition$ | async as nutrition">
            <nutrition-info-form (create)="createItem($event)" [doc]="nutrition"  (update)="updateNutrition($event)"></nutrition-info-form>
        </div>
        <div *ngIf="err">{{ err }}</div>
    `
})

export class NutritionInfoComponent implements OnInit, OnDestroy{
    constructor(
        private nutritionInfoService: NutritionInfoService,
        private route: ActivatedRoute,
        private router: Router, 
    ){

    }
    nutrition$: Observable<any>;
    
    ngOnInit(){
        this.nutrition$ = this.route.params.pipe(switchMap(param => this.nutritionInfoService.getNutrition(param.id)));
    }

    ngOnDestroy(){

    }

    createItem(event: any){
        this.nutritionInfoService.createNutritionInfo(event);
    }

    async updateNutrition(event: any){
        const docID = this.route.snapshot.params.id;
        await this.nutritionInfoService.updateNutrition(docID, event);
        this.router.navigate(['/admin/nutrition-info/list']);
    }
}