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
    createWorkout(event: any){
        console.log(event);
    }
}