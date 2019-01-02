import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
    selector: 'workoutDetails-program',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['workoutDetails-program.component.scss'],
    template:
    `
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
    
    `
})

export class WorkoutDetailsProgramComponent{
    @Input() workoutProgram: any;
}