import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

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

                        <input id="tab2" type="radio" name="tabs">
                        <label for="tab2">Create your own</label>
                
                        <section id="content1">
                            <a class="assign-plan__close">&times;</a>
                            <h2 class="heading-secondary u-margin-bottom-small"></h2>
                            <h3 class="heading-tertiary u-margin-bottom-small"></h3>
                            <p class="assign-plan__text">
                                <button (click)="filterBy('curry')">Curry</button>
                                <button (click)="filterBy('salad')">Salad</button>
                                <button (click)="filterBy('snacks')">Snacks</button>
                                <button (click)="filterBy('cusine')">Cusine</button>
                                {{ type.type }}           
                            </p>
                        
                            <div class="list-item" *ngFor="let meal of meals" (click)="toggleItem(meal.name)" [class.active]="existingItem(meal.name)">
                                <p class="list-item__name">{{ meal.name }}</p>
                                <p class="list-item__list">Ingredients: <span>{{ meal.ingredients }}</span></p>
                            </div>
                        </section>
                
                        <section id="content2">
                            <p>
                                Bacon ipsum dolor sit amet landjaeger sausage brisket, jerky drumstick fatback boudin.
                            </p>
                            <p>
                                Jerky jowl pork chop tongue, kielbasa shank venison. Capicola shank pig ribeye leberkas filet mignon brisket beef kevin tenderloin porchetta. Capicola fatback venison shank kielbasa, drumstick ribeye landjaeger beef kevin tail meatball pastrami prosciutto pancetta. Tail kevin spare ribs ground round ham ham hock brisket shoulder. Corned beef tri-tip leberkas flank sausage ham hock filet mignon beef ribs pancetta turkey.
                            </p>
                        </section>

                        <section id="content3">
                           
                        </section>
                    </main>
      
                    <button (click)="createPlan()" type="button">Update</button>
                    <button (click)="closeModal()">x</button>
                </div>
            </div>
        </div>
    `
})

export class AssignPlanComponent{
    @Input() open: boolean;

    @Input() type: any;

    @Input() meals: any;

    @Output() add = new EventEmitter<any>();

    @Output() close = new EventEmitter<any>();

    chosenItem: string[] = [];
    createPlan(){
        this.add.emit({ [this.type.type]: this.chosenItem });
    }

    closeModal() {
        this.close.emit();
    }

    toggleItem(item: string) {
        if (this.existingItem(item)) {
            this.chosenItem = this.chosenItem.filter(x => x !== item);
        } else {
            this.chosenItem = [...this.chosenItem, item];
        }
        console.log(item);
    }

    existingItem(item: string) {
        return !!~this.chosenItem.indexOf(item);
    }
}