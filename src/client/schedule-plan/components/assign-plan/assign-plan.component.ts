import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'assign-plan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['assign-plan.component.scss'],
    template: `
        <div class="assign-plan">
            <div class="assign-plan__content">
                <div class="assign-plan__right">
                    <main>
                    
                        <input id="tab1" type="radio" name="tabs" checked>
                        <label for="tab1">Our Suggestions</label>
                    
                        <input id="tab2" type="radio" name="tabs">
                        <label for="tab2">All Meal List</label>

                        <input id="tab3" type="radio" name="tabs">
                        <label for="tab3">Create your own</label>
                
                        <section id="content1">
                            {{ type.type }}
                            <data-list [type]="type" [userInfo]="user" [meals]="meals" (filter)="filterBy($event)" (add)="createPlan($event)" (close)="closeModal()"></data-list>
                        </section>
                
                        <section id="content2">
                            
                        </section>

                        <section id="content3">
                           <create-meal (meal)="addMealPlan($event)"></create-meal>
                        </section>
                    </main>
      
                </div>
            </div>
        </div>
    `
})

export class AssignPlanComponent implements OnInit{
    @Input() open: boolean;

    @Input() type: any;

    @Input() meals: any;

    @Output() add = new EventEmitter<any>();

    @Output() close = new EventEmitter<any>();

    @Input() user: any;

    constructor(){
        
        console.log(this.type);
    }

    ngOnInit(){
        console.log(this.user);
    }

    createPlan(event){
        this.add.emit({ [this.type.type]: event });
    }

    closeModal() {
        this.close.emit();
    }

    @Output() ownMeal = new EventEmitter<any>();
    addMealPlan(event){
        this.ownMeal.emit({ [this.type.type]: event });
    }

    @Output() filter = new EventEmitter<any>();
    filterBy(item: string|null){
        this.filter.emit(item);
    }
}