import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'section-plan',
    styleUrls: ['section-plan.component.scss'],
    template: `
        <div (click)="selectSection(section)">Add {{ section }}</div>
    `
})

export class SectionPlanComponent{

    @Output() selected = new EventEmitter<any>();

    @Input() section: any;

    selectSection(section: any, selection: string[] = []){
        this.selected.emit({ section, selection})
    }





}