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
            Meal Recipe
            <div *ngIf="recipe$ | async as recipe">
                <meal-recipe-form (create)="createRecipe($event)" [doc]="recipe" (update)="updateRecipe($event)"></meal-recipe-form>
            </div>
            <div *ngIf="err">{{ err }}</div>
           
        </div>
    `
})

export class MealRecipeComponent implements OnInit, OnDestroy{

    err;

    constructor(
        private mrService: MealRecipeService,
        private route: ActivatedRoute,
        private router: Router, 
        public af:AngularFireDatabase,
    ){}

    recipe$: Observable<any>;
    subscription: Subscription;

    ngOnInit(){
        this.subscription = this.mrService.filterItems$.subscribe();
        this.recipe$ = this.route.params.pipe(switchMap(param => this.mrService.getRecipe(param.id)));
        // this.recipe$ = this.route.params.subscribe(params => this.fs.getRecipe(params.id));
        
        // this.recipe$ = this.route.paramMap.pipe(switchMap(params => {
        //     const id = + params.get("id")
        //     this.fs.getRecipe(id.toString())
        // }));
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    async createRecipe(event: any){
        await this.mrService.createMealRecipe(event);      
       // this.router.navigate(['/home']);
    }

    async updateRecipe(event: any){
        const docID = this.route.snapshot.params.id;
        await this.mrService.updateRecipe(docID, event);
        this.router.navigate(['/meal-recipe']);
    }
}