import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { WorkoutGuideService } from './../../services/workoutguide.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'workout-guide',
    template: `
        <div>
            <div *ngIf="workout$ | async as workout; else fetching;">
                <workout-guide-form [doc]="workout" (create)="createWorkout($event)" (update)="updateWorkout($event)"></workout-guide-form>
            </div>
            <ng-template #fetching>
                <div class="message">
                    <spinning-icon></spinning-icon>
                </div>
            </ng-template>
        </div>
    `
})

export class WorkoutGuideComponent implements OnInit{

    constructor(
        private wgService: WorkoutGuideService,
        private route: ActivatedRoute,
        private router: Router){}

    async createWorkout(event: any){
        await this.wgService.createWorkout(event);
        this.router.navigate(['/admin/workout-guide/list']);
    }

    workout$: Observable<any>;
   
    ngOnInit(){
        this.workout$ = this.route.params.pipe(switchMap(param => this.wgService.getWorkout(param.id)));
    }

    async updateWorkout(event: any){
        const docID = this.route.snapshot.params.id;
        await this.wgService.updateWorkout(docID, event);
        this.router.navigate(['/admin/workout-guide/list']);
    }
}