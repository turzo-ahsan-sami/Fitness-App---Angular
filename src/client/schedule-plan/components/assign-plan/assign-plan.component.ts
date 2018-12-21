import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'assign-plan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['assign-plan.component.scss'],
    template: `
        <div class="assign-plan">
            <div class="assign-plan__content">
                <div class="assign-plan__right">
                    <a (click)="closeModal()" class="assign-plan__close">&times;</a>
                    <main>
                    
                        <input id="tab1" type="radio" name="tabs" checked>
                        <label for="tab1">All Meal List</label>
                    
                        <input id="tab2" type="radio" name="tabs">
                        <label for="tab2">Our Suggestions</label>

                        <input id="tab3" type="radio" name="tabs">
                        <label for="tab3">Create your own</label>
                
                        <section id="content1">
                            <filter-type *ngFor="let type of types" [item]="type" (filter)="filterBy($event)"></filter-type>
                            <data-list [type]="type" [userInfo]="user" [meals]="meals" (filter)="filterBy($event)" (add)="createPlan($event)" (close)="closeModal()"></data-list>
                        </section>
                
                        <section id="content2">
                            <div *ngIf="suggestMeals | async as mealSuggestion">
                                <data-list [type]="type" [userInfo]="user" [meals]="mealSuggestion" (add)="createPlan($event)" (close)="closeModal()"></data-list>
                            </div>
                            
                        </section>

                        <section id="content3">
                           <create-meal [type]="type" (meal)="createPlan($event)"></create-meal>
                        </section>
                    </main>
      
                </div>
            </div>
        </div>
    `
})

export class AssignPlanComponent implements OnInit{

    types = [
        { key: 'curry', value: 'Curry' },
        { key: 'salad', value: 'Salad' },
        { key: 'dairy', value: 'Dairy' },
        { key: 'fruits', value: 'Fruits' },
        { key: 'vegetables', value: 'Vegetables'}
    ];
    
    @Input() open: boolean;

    @Input() type: any;

    @Input() meals: any;

    @Output() add = new EventEmitter<any>();

    @Output() close = new EventEmitter<any>();

    @Input() user: any;

    @Input() suggestMeals: any;

    constructor(){}

    ngOnInit(){
        console.log(this.user);
    }

    createPlan(event){
        this.add.emit(event);
    }

    closeModal() {
        this.close.emit();
    }

    @Output() filter = new EventEmitter<any>();
    filterBy(item: string|null){
        this.filter.emit(item);
    }
}