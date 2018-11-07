import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MealRecipeService } from '../../services/meal-recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { map, filter, scan } from 'rxjs/operators';
import { PARAMETERS } from '@angular/core/src/util/decorators';


@Component({
    selector: 'meal-recipe',
    template: `
        <div>
            Meal Recipe
            <meal-recipe-form (create)="createRecipe($event)" (update)="updateRecipe($event)"></meal-recipe-form>
            <div *ngIf="err">{{ err }}</div>
            <div *ngIf="recipe$ | async as recipe"> {{ recipe | json }}</div>
        </div>
    `
})

export class MealRecipeComponent implements OnInit, OnDestroy{

    err; 
    sub: Subscription;

    constructor(
        private fs: MealRecipeService,
        private route: ActivatedRoute,
        private router: Router, 
        public af:AngularFireDatabase
    ){}

    recipe$: Observable<any>;

    ngOnInit(){
     
        // this.recipe$ = this.route.params.subscribe(params => this.fs.getRecipe(params.id));
        
        // this.recipe$ = this.route.paramMap.pipe(switchMap(params => {
        //     const id = + params.get("id")
        //     this.fs.getRecipe(id.toString())
        // }));
    }

    ngOnDestroy(){

    }

    async createRecipe(event: any){
        await this.fs.createMealRecipe(event);      
       // this.router.navigate(['/home']);
    }

    async updateRecipe(event: any){
       // await this.fs.updateMealRecipe(event);
    }
}