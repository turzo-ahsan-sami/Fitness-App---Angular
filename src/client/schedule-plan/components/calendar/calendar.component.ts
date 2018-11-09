import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SchedulePlanService } from './../../services/schedule-plan.service';
import { OnChanges, Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'calendar',
    template: `
        Calendar section
       
        {{ date }}
        <button *ngFor="let day of days; let i = index;" (click)="selectDay(i)" type="button">
            {{ day }}
        </button>
    `
})

export class CalendarComponent implements OnChanges{

    constructor(public spService: SchedulePlanService){}

    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    chosenDay: Date = new Date();
    
    @Input() 
    date: Date;
    

    //firstDayOfWeek: Date;
    firstDayOfWeek: Date = this.getFirstDayOfWeek(new Date(this.chosenDay));
    ngOnChanges(){
        
    }

    getFirstDayOfWeek(date: Date){
        let day = date.getDay();
        let x = date.getDate() - day;
        return new Date(date.setDate(x));
    }

    getTodayDate(date: Date){

    }

    @Output()
    change = new EventEmitter<Date>();

    selectDay(i){
        const day = new Date(this.firstDayOfWeek);
        day.setDate(day.getDate() + i);
        this.change.emit(day);
    }

}