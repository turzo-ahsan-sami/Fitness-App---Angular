import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'assign-workout',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./../assign-plan/assign-plan.component.scss'],
    template: `
        <div class="assign-plan">
            <div class="assign-plan__content">
                <div class="assign-plan__right">
                    <main>
                        <input id="tab1" type="radio" name="tabs" checked>
                        <label for="tab1">Our Suggestions</label>
                    
                        <input id="tab2" type="radio" name="tabs">
                        <label for="tab2">All Workout List</label>

                        <input id="tab3" type="radio" name="tabs">
                        <label for="tab3">Add your own workout</label>
                
                        <section id="content1">
                            <data-list [type]="type" [userInfo]="user" [meals]="workouts" (filter)="filterBy($event)" (add)="createPlan($event)" (close)="closeModal()"></data-list>
                        </section>
                
                        <section id="content2">
                            
                        </section>

                        <section id="content3">
                            <create-workout></create-workout>
                        </section>
                    </main>

                </div>
            </div>
        </div>
    `
})

export class AssignWorkoutComponent{
    @Input() open: boolean;

    @Input() type: any;

    @Input() workouts: any;

    @Output() add = new EventEmitter<any>();

    @Output() close = new EventEmitter<any>();

    @Input() user: any;

    constructor(){}

    ngOnInit(){
        console.log(this.user);
    }

    createPlan(event){
        this.add.emit({ [this.type.type]: event });
    }

    closeModal() {
        this.close.emit();
    }

    @Output() ownWorkout = new EventEmitter<any>();
    addMealPlan(event){
        this.ownWorkout.emit({ [this.type.type]: event });
    }

    @Output() filter = new EventEmitter<any>();
    filterBy(item: string|null){
        this.filter.emit(item);
    }
}