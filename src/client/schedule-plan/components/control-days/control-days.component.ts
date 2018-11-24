import { EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'control-days',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['control-days.component.scss'],
    template: `
            <button (click)="switchDate(x-1)"><</button>
            <button (click)="switchDate(x+1)">></button>
            {{ currentDate | date:'yMMMMd' }}
    `
})

export class ControlDaysComponent{

    @Input()
    currentDate: Date;

    @Output()
    switch = new EventEmitter<any>();

    x = 0;

    switchDate(x){
        this.x = x;
        console.log(x);
        this.switch.emit(x);
    }
}