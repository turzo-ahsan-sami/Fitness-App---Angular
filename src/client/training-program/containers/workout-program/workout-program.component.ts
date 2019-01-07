import { Subscription } from 'rxjs';
import { TrainingProgramService } from './../../services/training-program.service';
import { OnInit, OnDestroy, OnChanges } from '@angular/core';

import { Component, NgZone } from '@angular/core';

@Component({
    selector: 'training-program',
    styleUrls: ['workout-program.component.scss'],
    template: `
        <div class="workout-programme">
            <div *ngIf="workoutProgram$| async as workoutProgram; else fetching;">
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

export class WorkoutProgramComponent implements OnInit, OnChanges, OnDestroy {
    constructor(
        private tpService: TrainingProgramService,
        private zone:NgZone,
    ){}

    workoutProgram$;
    subscription: Subscription;

    ngOnInit(){
        this.workoutProgram$ = this.tpService.test$;
        // this.subscription = this.tpService.test$.subscribe(x => {
        //    // this.zone.run(() => {
        //         this.workoutProgram$ = x;
        //         console.log(x);
        //     //});
        // });
    }

    ngOnChanges(){
        this.subscription = this.tpService.test$.subscribe(x => {
            this.zone.run(() => {
                this.workoutProgram$ = x;
                console.log(x);
            });
        });
    }

    ngOnDestroy(){
        //this.subscription.unsubscribe();
    }

}