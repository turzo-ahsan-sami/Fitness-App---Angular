import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'assign-workout',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['assign-workout.component.scss'],
    template: `
        <div class="assign-workout">
            <div class="assign-workout">
                <div class="assign-workout__right">
                    <main>
                        <input id="tab1" type="radio" name="tabs" checked>
                        <label for="tab1">Our Suggestions</label>
                    
                        <input id="tab2" type="radio" name="tabs">
                        <label for="tab2">All Workout List</label>

                        <input id="tab3" type="radio" name="tabs">
                        <label for="tab3">Add your own workout</label>
                
                        <section id="content1">
                            
                        </section>
                
                        <section id="content2">
                            
                        </section>

                        <section id="content3">
                            
                        </section>
                    </main>

                </div>
            </div>
        </div>
    `
})

export class AssignWorkoutComponent{

}