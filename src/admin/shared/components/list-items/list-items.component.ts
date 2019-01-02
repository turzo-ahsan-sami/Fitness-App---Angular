
import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'list-items',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['list-items.component.scss'],
    template: `
        <table>
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Title</th>
                    <th>Items list</th>
                    <th>Aim For</th>
                    <th colspan="2">Actions</th>
                </tr>
            </thead>
            
            <tbody *ngFor="let item of items; let i = index;">
            
                <tr *ngIf="item.ingredients;">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item?.name }}</td>
                    <td>{{ item?.ingredients | verticalBar }}</td>
                    <td>{{ item?.targetedBody }}</td>
                    <td>
                        <a (click)="removeItem(item.id)"><img src="/assets/trash.svg"></a>
                    </td>
                    <td><a [routerLink]="getRouteType(item)"><img src="/assets/edit.svg"></a></td>
                </tr>

                <tr *ngIf="item.cardio || item.weight;">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item?.name }}</td>
                    <td>{{ item?.type }}</td>
                    <td>{{ item?.targetBody }}</td>
                    <td>
                        <a (click)="removeItem(item.id)"><img src="/assets/trash.svg"></a>
                    </td>
                    <td><a [routerLink]="getRouteType(item)"><img src="/assets/edit.svg"></a></td>
                </tr>

            
                <tr *ngIf="item.foodProducts;">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item?.title }}</td>
                    <td>{{ item?.foodProducts | verticalBar }}</td>
                    <td>{{ item?.bodyType }}</td>
                    <td>
                        <a (click)="removeItem(item.id)"><img src="/assets/trash.svg"></a>
                    </td>
                    <td><a [routerLink]="getRouteType(item)"><img src="/assets/edit.svg"></a></td>
                </tr>

                <tr *ngIf="item.days;">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item?.title }}</td>
                    <td>{{ item?.description }}</td>
                    <td>{{ item?.bodyType }}</td>
                    <td>
                        <a (click)="removeItem(item.id)"><img src="/assets/trash.svg"></a>
                    </td>
                    <td><a [routerLink]="getRouteType(item)"><img src="/assets/edit.svg"></a></td>
                </tr>
            </tbody>
        </table>    

    `
})

export class ListItemsComponent{
    @Input()
    items: any;

    @Output()
    remove = new EventEmitter<any>();

    removeItem(item: any){
        this.remove.emit(item);
    }

    getRouteType(item: any){
        return [`../`, item.id];
    }
}