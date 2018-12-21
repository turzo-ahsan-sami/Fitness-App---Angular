import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MealRecipeService } from '../../services/meal-recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
    selector: 'meal-recipe',
    template: `
        <div>
            <div *ngIf="recipe$ | async as recipe; else fetching;">
                <meal-recipe-form (create)="createRecipe($event)" [doc]="recipe" (update)="updateRecipe($event)"></meal-recipe-form>
            </div>
            <ng-template #fetching>
                <div class="message">
                    <spinning-icon></spinning-icon>
                </div>
            </ng-template>
            <div *ngIf="err">{{ err }}</div>
           
        </div>
    `
})

export class MealRecipeComponent implements OnInit{

    err;

    constructor(
        private mrService: MealRecipeService,
        private route: ActivatedRoute,
        private router: Router, 
        public af:AngularFireDatabase,
    ){}

    recipe$: Observable<any>;

    ngOnInit(){
        this.recipe$ = this.route.params.pipe(switchMap(param => this.mrService.getRecipe(param.id)));
    }

    async createRecipe(event: any){
        await this.mrService.createMealRecipe(event);      
        this.router.navigate(['/admin/meal-recipe/list']);
    }

    async updateRecipe(event: any){
        const docID = this.route.snapshot.params.id;
        await this.mrService.updateRecipe(docID, event);
        this.router.navigate(['/admin/meal-recipe/list']);
    }
}