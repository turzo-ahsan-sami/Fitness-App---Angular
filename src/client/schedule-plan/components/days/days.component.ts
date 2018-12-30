import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'days',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['days.component.scss'],
    template: `
        <div class="days">
            <button class="day" *ngFor="let day of days; let i = index;" (click)="selectDay(i)" type="button">
                <span class="point-btn" [class.active]="i === selectedIndex">{{ day }}</span>
            </button>
        </div>
      
    `
})

export class DaysComponent{
    @Input() days: any;
    @Input() selectedIndex: number;

    @Output() switch = new EventEmitter<any>();
    selectDay(i: number){
        this.switch.emit(i);
    }
}