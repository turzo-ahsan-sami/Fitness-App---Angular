import { Observable } from 'rxjs';
import { UserInfoService } from './../../services/user-info.service';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'userInfo-edit',
    styleUrls: ['userInfo-edit.component.scss'],
    template: `
        <div *ngIf="user$ | async as user; else fetching;">
            <userInfo-editForm [user]="user" (edit)="editInfo($event)"></userInfo-editForm>
        </div>
        <ng-template #fetching>
            <div class="message">
                <spinning-icon></spinning-icon>
            </div>
        </ng-template>

    `
})

export class UserInfoEditComponent implements OnInit{
    constructor(
        private uiService: UserInfoService,
        private router: Router
    ){}
    
    user$: Observable<any>;
    item: any;

    ngOnInit(){
        this.user$ = this.uiService.userInfo$;
    }

    async editInfo(value){
        await this.uiService.updateUserInfo(value);
        window.location.reload();
        this.router.navigate(['/user/schedule-plan']);
    }
}