import { filter } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'data-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['data-list.component.scss'],
    template: `
        <a class="assign-plan__close">&times;</a>
        <h2 class="heading-secondary u-margin-bottom-small"></h2>
        <h3 class="heading-tertiary u-margin-bottom-small"></h3>
        <p class="assign-plan__text">
            <button (click)="filterBy('chicken')">Curry</button>
            <button (click)="filterBy('salad')">Salad</button>
            <button (click)="filterBy('snacks')">Snacks</button>
            <button (click)="filterBy('cusine')">Cusine</button>
            {{ type.type }}     
            {{ (userInfo)?.allergries }}
        </p>

        <div *ngIf="type.type == 'Workout'; else showMeal">
            <div class="list-item" *ngFor="let meal of meals; let i = index" (click)="toggleItem(meal)" [class.active]="existingItem(meal.name)">
                <p class="list-item__name">{{ meal.name }}</p>
                <p *ngIf="meal.weight.reps" class="list-item__list">
                    Reps: <span>{{ meal.weight.reps }}</span>
                    Sets: <span>{{ meal.weight.sets }}</span>
                </p>
                <p *ngIf="meal.cardio.distance" class="list-item__list">
                    Distance: <span>{{ meal.cardio.distance }}</span>
                    Duration: <span>{{ meal.cardio.duration }}</span>
                </p>
                <span (click)="toggleExpand()">more</span>
                <span *ngIf="expanded == true">
                    <ul>
                        <li *ngFor="let ele of meal.instructions" >{{ ele }}</li> 
                    </ul>
                </span>
            </div>
        </div>

        <ng-template #showMeal>
            <div class="list-item" *ngFor="let meal of meals; let i = index" (click)="toggleItem(meal, i)" [class.active]="existingItem(meal.name)">
                <p class="list-item__name">{{ meal.name }}</p>
                <p class="list-item__list">Ingredients: <span>{{ meal.ingredients }}</span></p>
                <span (click)="expanded[i] =! expanded[i]">more</span>
                <span *ngIf="expanded[i]">
                    <ul>
                        <li *ngFor="let ele of meal.instructions; let i = index" >{{ i + 1}}. {{ ele }}</li> 
                    </ul>
                </span>
                <span *ngIf="checkAllergy[i]">Allergy!</span>
            </div>
        </ng-template>

        <button (click)="createPlan()" type="button">Update</button>
        <button (click)="closeModal()">x</button>
    `
})

export class DataListComponent implements OnInit{
    constructor(){}

    chosenItem = [];
    ngOnInit(){
        console.log(this.userInfo.allergries);
        this.chosenItem = [
            ...this.type.selection
        ],
        console.log(this.type);
    }

    //expanded: boolean = false;
    expanded = [];

    toggleExpand(i){
        this.expanded[i] =! this.expanded[i];
    }

    @Input() type;
    @Input() meals: any;
    @Input() userInfo;

    checkAllergy =[];
    
    toggleItem(item, i) {
            var allergy = item.ingredients;
            if(allergy){
                 this.userInfo.allergries.filter(y => {
                    if(allergy.find(x => x == y)){
                        this.checkAllergy[i] = true;
                    }
                    return this.checkAllergy[i];
                    
                 }
                 
                    
                //   this.userInfo.allergries.filter(x => x === y)
                //  y === 'Eggs' 
                )
            }
            console.log(this.checkAllergy);
            
                
                
            
            
        


        if (this.existingItem(item)) {
            this.chosenItem = this.chosenItem.filter(x => x !== item.name);
        } else {
            this.chosenItem = [...this.chosenItem, item.name];
        }
        console.log(item.name);
    }

    @Output() add = new EventEmitter<any>();
    createPlan(){
        this.add.emit({ [this.type.type]: this.chosenItem });
    }

    existingItem(item: string) {
        return !!~this.chosenItem.indexOf(item);
    }

    @Output() ownMeal = new EventEmitter<any>();
    addMealPlan(event){
        this.ownMeal.emit({ [this.type.type]: event });
    }

    @Output() filter = new EventEmitter<any>();
    filterBy(item: string|null){
        this.filter.emit(item);
    }

    @Output() close = new EventEmitter<any>();
    closeModal() {
        this.close.emit();
    }

    
}
