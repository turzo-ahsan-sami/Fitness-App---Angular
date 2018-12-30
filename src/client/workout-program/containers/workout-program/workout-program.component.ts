import { OnInit } from '@angular/core';
import { TrainingProgramService } from './../../../user-info/services/training-program.service';
import { Component } from '@angular/core';

@Component({
    selector: 'training-program',
    styleUrls: ['workout-program.component.scss'],
    template: `
        <div class="workout-programme">
            <div *ngIf="workoutProgram$ | async as workoutProgram; else fetching;">
                <workoutDetails-program [workoutProgram]="workoutProgram"></workoutDetails-program>
            </div>
            <ng-template #fetching>
                <div class="message">
                    <spinning-icon></spinning-icon>
                </div>
            </ng-template>
        </div>
        <!--
        <div *ngIf="userinfo == workoutProgram.bodyType && userInfo !== days">
            // call there
        </div>
        -->
    `
})

export class WorkoutProgramComponent implements OnInit {
    constructor(
        private tpService: TrainingProgramService
    ){}

    workoutProgram$;

    ngOnInit(){
        this.workoutProgram$ = this.tpService.trainingType$;
    }

}