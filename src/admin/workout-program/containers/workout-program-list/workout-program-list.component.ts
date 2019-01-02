import { Observable } from 'rxjs';
import { WorkoutProgramService } from './../../services/workout-program.service';
import { Component } from "@angular/core";

@Component({
    selector: 'workout-program-list',
    styleUrls: ['workout-program-list.component.scss'],
    template:  `
        <div class="workout-program-list">
            <div class="workout-program-list__link">
                <a [routerLink]="['../create']">Create + </a>
            </div>
        
            <div class="workout-program-list__items" *ngIf="items | async as items; else fetching;">
                <list-items [items]="items" (remove)="RemoveItem($event)"></list-items>
            </div>
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