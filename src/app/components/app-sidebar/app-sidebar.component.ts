import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['app-sidebar.component.scss'],
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

export class AppSidebar{
    routes = [
        {
            link: 'user/suggestion/meal-programme', name: 'Meal Programme'
        },
        { 
            link: 'user/suggestion/workout-programme', name: 'Training Programme' 
        },
        {
            link: 'user/schedule-plan', name: 'Schedule'
        },
        {
            link: 'user/info', name: 'Profile'
        }
    ]
}