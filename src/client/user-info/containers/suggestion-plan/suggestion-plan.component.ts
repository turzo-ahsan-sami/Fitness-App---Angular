import { Observable, Subscription } from 'rxjs';
import { OnInit, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';

@Component({
    selector: 'suggestion-plan',
    styleUrls: ['suggestion-plan.component.scss'],
    template: `
        <div *ngIf="user$ | async as user">
            <div *ngIf="user.bodyType == 'weight-gain' && user.exerciseDaysAWeek == '1'">
                This workout is for your availability but to gain weight here is perfect plan to at least spend five days. 
            </div>
            <div *ngIf="user.bodyType == 'weight-gain' && user.exerciseDaysAWeek == '2-3'">
                This workout is for you.
            </div>
        </div>
       
    `
})

export class SuggestionPlanComponent implements OnInit {
    constructor(
        private uiService: UserInfoService
    ){}

    user$: Observable<any>;
    subscription: Subscription;
    ngOnInit(){
        this.user$ = this.uiService.userInfo$;
    }

    // ngAfterViewInit(){
    //     //this.uiService.getUserInfo();
    //     this.uiService.userInfo$;
    // }

}