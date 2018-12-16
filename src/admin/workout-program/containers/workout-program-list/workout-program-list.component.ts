import { Observable } from 'rxjs';
import { WorkoutProgramService } from './../../services/workout-program.service';
import { Component } from "@angular/core";

@Component({
    selector: 'workout-program-list',
    styleUrls: ['workout-program-list.component.scss'],
    template:  `
        <a [routerLink]="['../create']">Create</a>
        <div *ngIf="items | async as items; else fetching;">
            <list-items [items]="items" (remove)="RemoveItem($event)"></list-items>
        </div>
        <ng-template #fetching>
            <div class="message">
                <spinning-icon></spinning-icon>
            </div>
        </ng-template>
    `
})

export class WorkoutProgramListComponent{
    constructor(
        private wpService: WorkoutProgramService
    ){}

    items: Observable<any[]>;

    ngOnInit(){
        this.items = this.wpService.getWorkoutProgramList();
    }

    RemoveItem(key: any){
        this.wpService.deleteWorkoutProgram(key);
    }


}