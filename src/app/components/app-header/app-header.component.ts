import { EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Component, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['app-header.component.scss'],
    template: `
        <div class="app-header">
            <img src="/assets/logo.svg" alt="logo" class="app-header__logo"><span>Fitnezz</span>
    
            <nav class="app-header__user-nav">
                <div class="app-header__user-nav__icon-box">
                    <img class="app-header__user-nav__icon" src="/assets/logout.svg" (click)="signOut()">
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