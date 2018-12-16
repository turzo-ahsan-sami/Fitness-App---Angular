import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'admin-sidebar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['admin-sidebar.component.scss'],
    template: `
        <nav class="sidebar">
            <ul class="side-nav" >
                <li class="side-nav__item side-nav__item" *ngFor="let route of routes">
                    <a [routerLink]="route.link" class="side-nav__link" routerLinkActive="active">
                        <span>{{ route.name }}</span>
                    </a>
                </li>
            </ul>
        </nav>
    `
})

export class AdminSidebarComponent{
    routes = [
        {
            link: 'admin/meal-recipe/list', name: 'Meal List'
        },
        { 
            link: 'admin/workout-guide/list', name: 'Workout List' 
        },
        {
            link: 'admin/nutrition-info/create', name: 'Meal Programmes'
        },
        {
            link: 'admin/training-info/list', name: 'Workout Programmes'
        }
    ]
}