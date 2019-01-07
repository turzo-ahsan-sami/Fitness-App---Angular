import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'filter-type',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['filter-type.component.scss'],
    template: `
        <button class="btn-0" (click)="filterBy(item.key)">{{item.value}}</button>
    `
})

export class FilterTypeComponent{
    
    @Input() item;

    @Output() filter = new EventEmitter<any>();
    filterBy(key){
        this.filter.emit(key);
    }
}