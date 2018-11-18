import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'section-plan',
    styleUrls: ['section-plan.component.scss'],
    template: `
        {{ section }}
        <div *ngIf="section.workout; else existingItem">{{ section.workout }}</div>
        <ng-template #existingItem>
            <div class="section-plan" (click)="selectSection(type)">Add {{ type }}
                
            </div>
        </ng-template>
        
        
    `
})

export class SectionPlanComponent{

    @Output() selected = new EventEmitter<any>();

    @Input() section: any;
    @Input() type: string;

    selectSection(type: string, selection: string[] = []){
        const data = this.section;
        this.selected.emit({ type, selection, data})
    }





}