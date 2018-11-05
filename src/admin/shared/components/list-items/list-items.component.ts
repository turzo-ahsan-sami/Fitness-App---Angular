import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'list-items',
    template: `
        {{ item | json }}
        
        <button type="button" (click)="removeItem(item.key)">Remove</button>
    `
})

export class ListItemsComponent{
    @Input()
    item: any;

    @Output()
    remove = new EventEmitter<any>();

    removeItem(item: any){
        this.remove.emit(item);
    }
}