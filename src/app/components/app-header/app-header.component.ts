import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    styleUrls: ['app-header.component.scss'],
    template: `
        <div class="header">
            <form class="search">
                <input class="search__input" type="text" placeholder="Search..">
                <button class="search__button">
                    
                </button>
            </form>
        </div>
    `
})

export class AppHeaderComponent{

}