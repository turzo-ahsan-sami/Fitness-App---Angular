import { WorkoutGuideService } from './../../services/workoutguide.service';

import { Component, OnInit } from "@angular/core";
import { Observable, Subscription, BehaviorSubject, combineLatest } from 'rxjs';

@Component({
    selector: 'workout-guide-list',
    styleUrls: ['workout-guide-list.component.scss'],
    template: `
        <a [routerLink]="['../create']">Create</a>
        <div *ngIf="items | async as workouts; else fetching;">
            <list-items [items]="workouts" (remove)="RemoveWorkout($event)"></list-items>
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