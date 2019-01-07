import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'assign-meal',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['assign-meal.component.scss'],
    template: `
        <div class="assign-plan">
            
            <div class="assign-plan__content">
                <div class="assign-plan__header">
                    <a (click)="closeModal()" class="assign-plan__close">&times;</a>
                    
                    
                        <input id="tab1" type="radio" name="tabs" checked>
                        <label for="tab1">All Meal List</label>
                    
                        <input id="tab2" type="radio" name="tabs">
                        <label for="tab2">Our Suggestions</label>
                    
                        <input id="tab3" type="radio" name="tabs">
                        <label for="tab3">Create your own</label>
                
                    
                        <section id="content1">
                        
                            <filter-type *ngFor="let type of types" [item]="type" (filter)="filterBy($event)"></filter-type>
                            <div class="assign-plan__body">
                                <data-list [type]="type" [userInfo]="user" [meals]="meals" (filter)="filterBy($event)" (add)="createPlan($event)" (close)="closeModal()"></data-list>
                            </div>
                        </section>
                
                        <section id="content2">
                            <div *ngIf="suggestMeals | async as mealSuggestion; else fetching;">
                                <data-list [type]="type" [userInfo]="user" [meals]="mealSuggestion" (add)="createPlan($event)" (close)="closeModal()"></data-list>
                            </div>
                            <ng-template #fetching>
                                <div class="message">
                                    <spinning-icon></spinning-icon>
                                </div>
                            </ng-template>
                            
                        </section>

                        <section id="content3">
                           <create-meal [type]="type" (meal)="createPlan($event)"></create-meal>
                        </section>
                  
                    </div>
                
               
            </div>
            
        </div>
    `
})

export class AssignMealComponent implements OnInit{

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