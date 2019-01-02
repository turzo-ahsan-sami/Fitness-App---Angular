import { WorkoutGuideService } from './../../services/workoutguide.service';

import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';

@Component({
    selector: 'workout-guide-list',
    styleUrls: ['workout-guide-list.component.scss'],
    template: `
        <div class="workout-guide-list">
            <div class="workout-guide-list__link">
                <a [routerLink]="['../create']">Create + </a>
            </div>
            <div class="workout-guide-list__items" *ngIf="items | async as workouts; else fetching;">
                <list-items [items]="workouts" (remove)="RemoveWorkout($event)"></list-items>
            </div>
        </div>
    
        <ng-template #fetching>
            <div class="message">
                <spinning-icon></spinning-icon>
            </div>
        </ng-template>
                      
        
    `
})

export class WorkoutGuideListComponent implements OnInit{ 
    
    items: Observable<any[]>;
    
    constructor(
        public wgService: WorkoutGuideService
    ){}

    ngOnInit(){
        this.items = this.wgService.getWorkouts();
    }

    RemoveWorkout(key: any){
        this.wgService.deleteWorkout(key);
    }

}