import { EventEmitter, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'section-plan',
    styleUrls: ['section-plan.component.scss'],
    template: `

        <div class="section-plan">
            <div class="section-plan__calorie" *ngFor="let a of calories"
                [style.backgroundColor]="(a.calories < this.sumCalories ? '#abf88d' : '#ff9a9a')">
                <span>Target goal = {{ a.calories }}</span>
                <span id="current-calorie">Remaining calorie = {{  a.calories - this.sumCalories }}</span>
            </div>
            
            <div class="section-plan__bar">Breakfast</div>
            <div class="section-plan__list" *ngIf="section?.Breakfast; else existingBreakfast" (click)="selectSection('Breakfast', 'edit', section?.Breakfast.Breakfast)">
                {{ section?.Breakfast.Breakfast }}
            </div>
            <ng-template #existingBreakfast>
                <div class="section-plan__list" (click)="selectSection('Breakfast','new')">Add Breakfast</div>
            </ng-template> 
        </div>

        <div class="section-plan">
            <div class="section-plan__bar">Lunch</div>
            <div class="section-plan__list" *ngIf="section?.Lunch; else existingLunch" (click)="selectSection('Lunch', 'edit', section?.Lunch.Lunch)">
                {{ section?.Lunch.Lunch }}
            </div>
            <ng-template #existingLunch>
                <div class="section-plan__list" (click)="selectSection('Lunch','new')">Add Lunch</div>
            </ng-template>
        </div> 

        <div class="section-plan">
            <div class="section-plan__bar">Dinner</div>
            <div class="section-plan__list" *ngIf="section?.Dinner; else existingDinner" (click)="selectSection('Dinner', 'edit', section?.Dinner.Dinner)">
                {{ section?.Dinner.Dinner }}
            </div>
            <ng-template #existingDinner>
                <div class="section-plan__list" (click)="selectSection('Dinner', 'new')">Add Dinner</div>
            </ng-template> 
        </div>

        <div class="section-plan">
            <div class="section-plan__bar">Supper</div>
            <div class="section-plan__list" *ngIf="section?.Supper; else existingSupper" (click)="selectSection('Supper',  'edit', section?.Supper.Supper)">
                {{ section?.Supper.Supper }}
            </div>
            <ng-template #existingSupper>
                <div class="section-plan__list" (click)="selectSection('Supper','new')">Add Supper</div>
            </ng-template>
        </div> 

        <div class="section-plan">
            <div class="section-plan__bar">Workout</div>
            <div class="section-plan__list" *ngIf="section?.Workout; else existingWorkout" (click)="selectSection('Workout', 'edit', section?.Workout.Workout)">
                {{ section?.Workout.Workout }}
            </div>
            <ng-template #existingWorkout>
                <div class="section-plan__list" (click)="selectSection('Workout','new')">Add Workout</div>
            </ng-template>
        </div> 
           
<!--
        <div *ngIf="sec.Workout; else existingWorkout">{{ sec.Workout.Workout }}</div> 
        <ng-template #existingWorkout>
            <div class="section-plan" (click)="selectSection(type)">Add {{ type }}
                
            </div>
        </ng-template> !-->
        
        
    `
})

export class SectionPlanComponent implements OnInit, AfterViewInit{

    @Output() selected = new EventEmitter<any>();

     @Input() section: any;
     @Input() type: string;

    selectSection(type: string, checkEdit: string, selection: string[] = []){
        const data = this.section;
        this.selected.emit({ type, checkEdit, selection, data})
    }

    @Input() calories: any;
    @Input() sections: any;

    
    sec;
    @Input() items: any;
    @Output() caloriesTotal = new EventEmitter<any>();
   
    ngOnInit(){
        this.sec = this.items || {};
        console.log(this.items);

        
        
    }

    ngAfterViewInit(){
       
    }

    get totalCalorieForDinner(){
        if(this.section.Dinner){
            const sum =  this.section.Dinner.calorie.reduce((total: number, calorie) => total + calorie, 0);
            return sum; 
        }
        return 0;
    }

    get totalCalorieForSupper(){
        if(this.section.Supper){
            const sum =  this.section.Supper.calorie.reduce((total: number, calorie) => total + calorie, 0);
            return sum; 
        }
        return 0;
    }

    get totalCalorieForBreakfast(){
        if(this.section.Breakfast){
            const sum =  this.section.Breakfast.calorie.reduce((total: number, calorie) => total + calorie, 0);
            return sum;
        }
        return 0;
    }

    get totalCalorieForLunch(){
        if(this.section.Lunch){
            const sum =  this.section.Lunch.calorie.reduce((total: number, calorie) => total + calorie, 0);
            return sum; 
        }
        return 0;
    }
    
    get sumCalories(){
        let sum = this.totalCalorieForBreakfast + this.totalCalorieForLunch + this.totalCalorieForDinner + this.totalCalorieForSupper
        return sum;
    }



}