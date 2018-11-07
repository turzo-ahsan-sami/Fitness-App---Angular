import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'list-items',
    template: `
        <li>
            {{ item | json }}
            {{ item.payload.val() }}
            
            <button type="button" (click)="removeItem(item.key)">Remove</button>
            <a [routerLink]="getRouteType(item)">Edit</a>
        </li>
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

    getRouteType(item: any){
        return [`../${item.ingredients? 'workout-guide': 'meal-recipe'}`, item.key];
    }
}