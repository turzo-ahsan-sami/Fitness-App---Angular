import { Component, Input } from "@angular/core";

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
                        
                    </p>
                </div>
            </div>
        </div>
    `
})

export class AssignPlanComponent{
    @Input() open: boolean;
}