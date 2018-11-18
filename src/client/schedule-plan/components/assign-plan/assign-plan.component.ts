import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'assign-plan',
    styleUrls: ['assign-plan.component.scss'],
    template: `
        <div class="assign-plan">
            <div class="assign-plan__content">
                <div class="assign-plan__right">
                    <a class="assign-plan__close">&times;</a>
                    <h2 class="heading-secondary u-margin-bottom-small"></h2>
                    <h3 class="heading-tertiary u-margin-bottom-small"></h3>
                    <p class="assign-plan__text">
                        {{ type.type }}
                        
                    </p>
                    <div class="assign-plan__list">
                    <div *ngFor="let meal of meals" (click)="toggleItem(meal.name)" [class.active]="existingItem(meal.name)">
                        {{ meal.name }}
                    </div>
                    </div>
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