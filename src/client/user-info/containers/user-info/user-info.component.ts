import { Router } from '@angular/router';
import { Component } from "@angular/core";
import { UserInfoService } from "../../services/user-info.service";

@Component({
    selector: 'user-info',
    styleUrls: ['user-info.component.scss'],
    template: `
    <section>
      <div class="wrapper">
        <userInfo-form (submit)="uploadInfo($event)"></userInfo-form>
      </div>
    </section> 
    `
})

export class UserInfoComponent{
    constructor(
      private userInfoService: UserInfoService,
      private router: Router
    ){}

    async uploadInfo(event){
      await this.userInfoService.createUserInfo(event);
      this.router.navigate(['user/schedule-plan']);
     // console.log(event);
    }
}