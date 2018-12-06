import { EventEmitter, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'section-plan',
    styleUrls: ['section-plan.component.scss'],
    template: `
        <div *ngFor="let sec of sections">
            {{ sec }}
        </div>

        <div *ngIf="section?.Breakfast || section?.Lunch || section?.Supper || section?.Dinner">
            {{  totalCalorieForBreakfast + totalCalorieForLunch + totalCalorieForDinner + totalCalorieForSupper }}
        </div>
       
        <!--<div *ngIf="section?.Supper; else existingSupper">
            <div *ngFor="let s of section?.Supper">
                {{ s.calorie }} 
                {{ s.name }}
            </div>
        </div>-->

        <div *ngIf="section?.Breakfast; else existingBreakfast">
            {{ section?.Breakfast.Breakfast }}
        </div>
        <ng-template #existingBreakfast>
            <div class="section-plan" (click)="selectSection('Breakfast')">Add Breakfast
                
            </div>
        </ng-template> 

        <div *ngIf="section?.Lunch; else existingLunch">
            {{ section?.Lunch.Lunch }}
        </div>
        <ng-template #existingLunch>
            <div class="section-plan" (click)="selectSection('Lunch')">Add Lunch
                
            </div>
        </ng-template> 

       <!-- {{ section?.Supper | json }} -->
       <div *ngIf="section?.Dinner; else existingDinner">
            {{ section?.Dinner.Dinner }}
        </div>
        <ng-template #existingDinner>
            <div class="section-plan" (click)="selectSection('Dinner')">Add Dinner
                
            </div>
        </ng-template> 

        <div *ngIf="section?.Supper; else existingSupper">
            {{ section?.Supper.Supper }}
        </div>
        <ng-template #existingSupper>
            <div class="section-plan" (click)="selectSection('Supper')">Add Supper
                
            </div>
        </ng-template> 

        <div *ngIf="section?.Workout; else existingWorkout">
            {{ section?.Workout.name }}
        </div>
        <ng-template #existingWorkout>
            <div class="section-plan" (click)="selectSection('Workout')">Add Workout
                
            </div>
        </ng-template> 
           
<!--
        <div *ngIf="sec.Workout; else existingWorkout">{{ sec.Workout.Workout }}</div> 
        <ng-template #existingWorkout>
            <div class="section-plan" (click)="selectSection(type)">Add {{ type }}
                
            </div>
        </ng-template> !-->
        
        
    `
})

export class SectionPlanComponent implements OnInit{

    @Output() selected = new EventEmitter<any>();

     @Input() section: any;
     @Input() type: string;

    selectSection(type: string, selection: string[] = []){
        const data = this.section;
        this.selected.emit({ type, selection, data})
    }


    @Input() sections: any;

    
    sec;
    @Input() items: any;
   
    ngOnInit(){
        this.sec = this.items || {};
        console.log(this.section);
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



}