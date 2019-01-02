import { WorkoutProgressService } from './../../services/workout-progress.service';
import { Component } from "@angular/core";

@Component({
    selector: 'workout-progress',
    styleUrls: ['workout-progress.component.scss'],
    template: `
        <div *ngIf="workoutProgress$ | async as workoutProgress" class="workout-progress">
            <div class="workout-progress__input">
                <input type="text" [(ngModel)]="searchText" class="" placeholder="Search by workout title.." />
            </div>

            <div class="workout-progress__table">
                <table>
                    <thead>
                        <tr>
                            <th>Workout Name</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Weight</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                
                    <tbody *ngFor="let wp of workoutProgress | searchFilter: searchText ">
                        <tr>
                            <td>{{ wp?.Workout }}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{ wp?.timestamp | date:'MMMM/dd/yyyy' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
})

export class WorkoutProgressComponent{
    workoutProgress$; 
    constructor(private wpService: WorkoutProgressService){
        this.workoutProgress$ = this.wpService.query;
    }
}