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
        </p>

        <div class="list-item" *ngFor="let meal of meals" (click)="toggleItem(meal.name)" [class.active]="existingItem(meal.name)">
            <p class="list-item__name">{{ meal.name }}</p>
            <p class="list-item__list">Ingredients: <span>{{ meal.ingredients }}</span></p>
            <span (click)="expanded = true">more</span>
            <span *ngIf="expanded == true">
                <ul>
                <li *ngFor="let ele of meal.instructions" >{{ ele }}</li> 
                </ul>
            </span>
        </div>

        <button (click)="createPlan()" type="button">Update</button>
        <button (click)="closeModal()">x</button>
    `
})

export class DataListComponent{
    constructor(){}

    expanded: false;

    @Input() type;
    @Input() meals: any;

    chosenItem: string[] = [];

    toggleItem(item: string) {
        if (this.existingItem(item)) {
            this.chosenItem = this.chosenItem.filter(x => x !== item);
        } else {
            this.chosenItem = [...this.chosenItem, item];
        }
        console.log(item);
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
}