import { WorkoutProgressService } from './../../../services/workout-progress.service';
import { Component } from '@angular/core';

@Component({
    selector: 'workout-progress',
   // styleUrls: ['workout-progress.component.scss'],
    template: `
    <div *ngIf="workoutProgress$ | async as workoutProgress">
        {{ workoutProgress | json  }}
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