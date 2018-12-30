import { WorkoutProgressService } from './../../../services/workout-progress.service';
import { Component } from '@angular/core';

@Component({
    selector: 'workout-progress',
   // styleUrls: ['workout-progress.component.scss'],
    template: `
    <div *ngIf="workoutProgress$ | async as workoutProgress">
        <input type="text" [(ngModel)]="searchText" 
        class="form-control" placeholder="Search By Category" />
        <div *ngFor="let wp of workoutProgress | searchFilter: searchText ">
            {{ wp | json }}
        </div>
       
    </div>
    `
})

export class WorkoutProgressComponent{

    workoutProgress$; 
    constructor(
        private wpService: WorkoutProgressService
    ){
        this.workoutProgress$ = this.wpService.query;
    }
}