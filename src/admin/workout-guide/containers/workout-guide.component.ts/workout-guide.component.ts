import { WorkoutGuideService } from './../../services/workoutguide.service';
import { Component } from "@angular/core";

@Component({
    selector: 'workout-guide',
    template: `
        <div>
            Workout Recipe
            <workout-guide-form (create)="createWorkout($event)"></workout-guide-form>
        </div>
    `
})

export class WorkoutGuideComponent{

    constructor(private wgService: WorkoutGuideService){}

    createWorkout(event: any){
        this.wgService.createWorkout(event);
    }
}