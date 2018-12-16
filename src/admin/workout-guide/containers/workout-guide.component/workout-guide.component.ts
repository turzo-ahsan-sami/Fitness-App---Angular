import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { WorkoutGuideService } from './../../services/workoutguide.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'workout-guide',
    template: `
        <div>
            <div *ngIf="workout$ | async as workout">
                <workout-guide-form [doc]="workout" (create)="createWorkout($event)" (update)="updateWorkout($event)"></workout-guide-form>
            </div>
        </div>
    `
})

export class WorkoutGuideComponent implements OnInit{

    constructor(
        private wgService: WorkoutGuideService,
        private route: ActivatedRoute,
        private router: Router){}

    createWorkout(event: any){
        this.wgService.createWorkout(event);
    }

    workout$: Observable<any>;
    subscription: Subscription;

    ngOnInit(){
        this.subscription = this.wgService.filterItems$.subscribe();
        this.workout$ = this.route.params.pipe(switchMap(param => this.wgService.getWorkout(param.id)));
    }

    async updateWorkout(event: any){
        const docID = this.route.snapshot.params.id;
        await this.wgService.updateWorkout(docID, event);
        this.router.navigate(['/admin/workout-guide/list']);
    }
}