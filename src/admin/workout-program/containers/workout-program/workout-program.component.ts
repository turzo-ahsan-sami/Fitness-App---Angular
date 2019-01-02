import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WorkoutProgramService } from './../../services/workout-program.service';
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'workout-program',
    styleUrls: ['workout-program.component.scss'],
    template:  `
        <div *ngIf="workoutProgram$ | async as workoutProgram; else fetching;">
            <workout-program-form [doc]="workoutProgram" (create)="createItem($event)" (update)="updateItem($event)"></workout-program-form>
        </div>
        <ng-template #fetching>
            <div class="message">
                <spinning-icon></spinning-icon>
            </div>
        </ng-template>
        <div *ngIf="err">{{ err }}</div>
    `
})

export class WorkoutProgramComponent implements OnInit{
    constructor(
        private route: ActivatedRoute,
        private router: Router, 
        private wpService: WorkoutProgramService
    ){}

    workoutProgram$: Observable<any>;
    
    ngOnInit(){
        this.workoutProgram$ = this.route.params.pipe(switchMap(param => this.wpService.getWorkoutProgram(param.id)));
    }

    async createItem(event: any){
        await this.wpService.createWorkoutProgram(event);
        this.router.navigate(['/admin/workout-program/list']);
    }

    async updateItem(event: any){
        const docID = this.route.snapshot.params.id;
        await this.wpService.updateWorkoutProgram(docID, event);
        this.router.navigate(['/admin/workout-program/list']);
    }

}