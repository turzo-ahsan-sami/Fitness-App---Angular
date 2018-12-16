import { EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Component, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['app-header.component.scss'],
    template: `
        <div class="header">
            <img src="" alt="logo" class="logo">
            <form class="search">
                <input class="search__input" type="text" placeholder="Search..">
                <button class="search__button">
                    
                </button>
            </form>
            <nav class="user-nav">
                <div class="user-nav__icon-box">
                    <img class="user-nav__icon" src="/assets/logout.svg" (click)="signOut()">
                </div>
            </nav>
        </div>
    `
})

export class AppHeaderComponent{

    @Output() logOutUser = new EventEmitter<any>();
  
    signOut() {
        this.logOutUser.emit();
    }

}