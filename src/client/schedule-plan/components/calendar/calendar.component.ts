import { Input, ChangeDetectionStrategy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SchedulePlanService } from './../../services/schedule-plan.service';
import { OnChanges, Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['calendar.component.scss'],
    template: `
        Calendar section
        <control-days (switch)="changeWeek($event)" [currentDate]="chosenDay"></control-days>
        <div class="wrap">
            <div class="days">
                <button class="day" *ngFor="let day of days; let i = index;" (click)="selectDay(i)" type="button">
                    <span [class.active]="i === chosenDay">{{ day }}</span>
                </button>
            </div>
            <div class="sections">
                <section-plan *ngFor="let section of sections" (selected)="addSection($event)" [section]="getType(section)" [type]="section"></section-plan>
            </div> 
        </div>
    `
})

export class CalendarComponent implements OnChanges{

    constructor(public spService: SchedulePlanService){}

    days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    sections = ['Breakfast', 'Lunch', 'Dinner', 'Supper', 'Workout'];
    
    chosenDay: Date = new Date();
    
    @Input() 
    set date(date: Date){
        this.chosenDay = new Date(date.getTime());
    }
    
    firstDayOfWeek: Date;
    
    ngOnChanges(){
        this.firstDayOfWeek = this.getFirstDayOfWeek(new Date(this.chosenDay));
    }

    getFirstDayOfWeek(date: Date){
        let day = date.getDay();
        let x = date.getDate() - day;
        return new Date(date.setDate(x));
    }

    @Output() changeDate = new EventEmitter<Date>();

    selectDay(i){
        const day = new Date(this.firstDayOfWeek);
        day.setDate(day.getDate() + i);
        this.changeDate.emit(day);
    }

    changeWeek(event){
        const firstDayOfWeek = this.getFirstDayOfWeek(new Date());
        const firstdate = (new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate()));
        firstdate.setDate(firstdate.getDate() + (7 * event));
        this.changeDate.emit(firstdate);
        console.log(firstdate);
    }

    @Output() open = new EventEmitter<any>();

    addSection({type, selection, data}){
        const selectedDay = this.chosenDay;
        this.open.emit({type, selection, data, selectedDay});  
    }

    @Input() items: any;

    ///
    getType(section): any {
        console.log(this.items);
        return this.items && this.items[section] || {};
        
    }

}