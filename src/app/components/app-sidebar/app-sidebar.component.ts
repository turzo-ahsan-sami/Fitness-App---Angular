import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    styleUrls: ['app-sidebar.component.scss'],
    template: `
        <nav class="sidebar">
            <ul class="side-nav">
                <li class="side-nav__item side-nav__item--active">
                    <a href="#" class="side-nav__link">
                        <span>Workout</span>
                    </a>
                </li>
                <li class="side-nav__item">
                    <a href="#" class="side-nav__link">        
                       <span>Meal</span>
                    </a>
                </li>
            </ul>
        </nav>
    `
})

export class AppSidebar{}