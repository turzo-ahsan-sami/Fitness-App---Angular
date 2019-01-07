
import { WorkoutProgressService } from './../../services/workout-progress.service';
import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";
import { Subscription } from 'rxjs';


@Component({
    selector: 'workout-progress',
    styleUrls: ['workout-progress.component.scss'],
    template: `
        <div *ngIf="workoutProgress$ as workoutProgress; else fetching;" class="workout-progress">
            <div class="workout-progress__input">
                <input type="text" [(ngModel)]="searchText" class="" placeholder="Search by workout title.." />
            </div>

            <div class="workout-progress__table">
                <table>
                    <thead>
                        <tr>
                            <th>Workout Name</th>
                            <th>Workout Data</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                
                    <tbody *ngFor="let wp of workoutProgress">
                        <tr *ngFor="let a of wp?.Workout | searchFilter: searchText">
                            <td>{{ a.name }}</td>
                            <td *ngIf="a.type == 'weight'">
                                Reps: {{ a.weight.reps }} <br />
                                Sets: {{ a.weight.sets }} <br />
                                Weight: {{ a.weight.weight }} <br />
                            </td>
                            <td *ngIf="a.type == 'cardio'">
                                Distance: {{ a.cardio.distance }} <br />
                                Duration: {{ a.cardio.duration }} <br />
                            </td>
                            <td>{{ wp?.timestamp | date:'MMMM/dd/yyyy' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <ng-template #fetching>
            <div class="message">
                <spinning-icon></spinning-icon>
            </div>
        </ng-template>
    `
})

export class WorkoutProgressComponent implements OnInit, OnDestroy{
    workoutProgress$; 
    subscription: Subscription;
    
    constructor(
        private wpService: WorkoutProgressService,
        private zone:NgZone){}

   
    ngOnInit(){
        this.subscription = this.wpService.query$.subscribe(x => {
            this.zone.run(() => {
                this.workoutProgress$ = x;
            })
        });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}