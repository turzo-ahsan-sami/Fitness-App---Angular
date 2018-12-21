import { TrainingProgramService } from './../../services/training-program.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';


@Component({
    selector: 'workout-programme',
    styleUrls: ['workout-programme.component.scss'],
    template: `
      
        <div class="workout-programme">
            <div *ngIf="workoutProgram$ | async as workoutProgram">
                <h3>Workout Structure</h3>
                {{ workoutProgram?.title }}

                <div>
                    {{ workoutProgram?.description }}
                </div>

                <div>
                    <h3>Your Workout Plan</h3>
                    <div *ngFor="let workout of workoutProgram.workouts">
                        <h5>{{ workout.day }}</h5>
                        <ul>
                            <li>
                                {{ workout.workoutTitle }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--
        <div *ngIf="userinfo == workoutProgram.bodyType && userInfo !== days">
            // call there
        </div>
         -->
      
    `
})

export class WorkoutProgrammeComponent implements OnInit {
    constructor(
        private tpService: TrainingProgramService
    ){}

    workoutProgram$;

    ngOnInit(){
        this.workoutProgram$ = this.tpService.trainingType$;
    }

}