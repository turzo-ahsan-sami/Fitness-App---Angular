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
        <h2 class="heading-secondary u-margin-bottom-small"></h2>
        <h3 class="heading-tertiary u-margin-bottom-small"></h3>
        <p class="assign-plan__text">
            
        </p>

        <div *ngIf="type.type == 'Workout'; else showMeal">
            <div class="list-item" *ngFor="let meal of meals; let i = index" (click)="toggleItem(meal, i)" [class.active]="existingItem(meal.name)">
                <p class="list-item__name">{{ meal.name }}</p>
                <p *ngIf="meal.weight.reps" class="list-item__list">
                    Reps: <span>{{ meal.weight.reps }}</span>
                    Sets: <span>{{ meal.weight.sets }}</span>
                </p>
                <p *ngIf="meal.cardio.distance" class="list-item__list">
                    Distance: <span>{{ meal.cardio.distance }}</span>
                    Duration: <span>{{ meal.cardio.duration }}</span>
                </p>
                <span id="more" (click)="expanded[i] =! expanded[i]; $event.stopPropagation()">more</span>
                <span *ngIf="expanded[i]">
                    <ul>
                        <li *ngFor="let ele of meal.instructions; let i = index" >{{ i + 1}}.{{ ele }}</li> 
                    </ul>
                </span>
            </div>
        </div>

        <ng-template #showMeal>
            <div class="list-item" *ngFor="let meal of meals; let i = index" (click)="toggleItem(meal, i)" [class.active]="existingItem(meal.name)">
                <p class="list-item__name">{{ meal.name }}</p>
                <span class="list-item__fact"> Calorie: {{ meal.calorie }}</span> | 
                <span class="list-item__fact"> Protein: {{ meal.protein }}</span> | 
                <span class="list-item__fact"> Fat: {{ meal.fat }}</span>
                <p class="list-item__list">Ingredients: <span>{{ meal.ingredients }}</span></p>
                <span id="more" (click)="expanded[i] =! expanded[i];$event.stopPropagation()">more</span>
                <span *ngIf="expanded[i]">
                    <ul>
                        <li *ngFor="let ele of meal.instructions; let i = index" >{{ i + 1}}. {{ ele }}</li> 
                    </ul>
                </span> 
                <p *ngIf="checkAllergy[i]" class="error">Warning! This recipe contains an ingredient that is allergic to you!</p>
            </div>
        </ng-template>

        <button class="button button--create" (click)="createPlan()" type="button">Add</button>

        
    `
})

export class DataListComponent implements OnInit{
    constructor(){}

    chosenItem = [];
    ngOnInit(){
        console.log(this.type);
        this.chosenItem = [
            ...this.type.selection
        ]
    }

    expanded = [];

    toggleExpand(i){
        this.expanded[i] =! this.expanded[i];
    }

    @Input() type;
    @Input() meals: any;
    @Input() userInfo;

    checkAllergy =[];
    calculateCalorie = [];
    
    toggleItem(item, i) {
        
        if(item.ingredients) 
        {
            this.userInfo.allergries.filter(y => {
                if(item.ingredients.find(x => x == y)){
                    this.checkAllergy[i] = true;
                }
                return this.checkAllergy[i];     
            })
        }

        if (this.existingItem(item.name)) {
            this.chosenItem = this.chosenItem.filter(x => x !== item.name);
            this.calculateCalorie = this.calculateCalorie.filter(x => x!== item.calorie)
        } else {
            this.chosenItem = [...this.chosenItem, item.name];
            this.calculateCalorie = [...this.calculateCalorie, item.calorie]
        }
        console.log(this.calculateCalorie);
    }

    @Output() add = new EventEmitter<any>();
    createPlan(){
        this.add.emit({ [this.type.type]: this.chosenItem, ['calorie']: this.calculateCalorie });
    }

    existingItem(item: string) {
        return !!~this.chosenItem.indexOf(item);
    }

    @Output() ownMeal = new EventEmitter<any>();
    addMealPlan(event){
        this.ownMeal.emit({ [this.type.type]: event });
    }

    @Output() close = new EventEmitter<any>();
    closeModal() {
        this.close.emit();
    }
}
