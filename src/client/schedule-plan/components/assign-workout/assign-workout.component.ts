import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'assign-workout',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./../assign-meal/assign-meal.component.scss'],
    template: `
        <div class="assign-plan">
            <div class="assign-plan__content">
                <div class="assign-plan__right">
                    <a (click)="closeModal()" class="assign-plan__close">&times;</a>
                    <main>
                        <input id="tab1" type="radio" name="tabs" checked>
                        <label for="tab1">All Workout List</label>
                    
                        <input id="tab2" type="radio" name="tabs">
                        <label for="tab2">Our Suggestions</label>

                        <input id="tab3" type="radio" name="tabs">
                        <label for="tab3">Add your own workout</label>
                
                        <section id="content1">
                        <filter-type *ngFor="let type of types" [item]="type" (filter)="filterBy($event)"></filter-type>
                            <data-list [type]="type" [userInfo]="user" [meals]="workouts" (filter)="filterBy($event)" (addWorkout)="createPlan($event)" (close)="closeModal()"></data-list>
                        </section>
                
                        <section id="content2">
                            <div *ngIf="suggestWorkouts | async as workouts; else fetching;">
                                <data-list [type]="type" [userInfo]="user" [meals]="workouts" (add)="createPlan($event)" (close)="closeModal()"></data-list>
                            </div>
                            <ng-template #fetching>
                                <div class="message">
                                    <spinning-icon></spinning-icon>
                                </div>
                            </ng-template>
                        </section>

                        <section id="content3">
                            <create-workout (workout)="createPlan($event)"></create-workout>
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
        //console.log(this.user);
    }

    createPlan(event){
        this.add.emit(event);
    }

    closeModal() {
        this.close.emit();
    }

    @Input() suggestWorkouts;

    types = [
        { key: 'shoulder', value: 'Shoulder' },
        { key: 'biceps', value: 'Biceps' },
        { key: 'leg', value: 'Leg' },
        { key: 'chest', value: 'Chest' },
        { key: 'cardio', value: 'Cardio' },
    ];

    //// FIX /////
    @Output() ownWorkout = new EventEmitter<any>();
    addMealPlan(event){
        console.log(event);
        this.ownWorkout.emit({ [this.type.type]: event });
    }

    @Output() filter = new EventEmitter<any>();
    filterBy(item: string|null){
        this.filter.emit(item);
    }
}