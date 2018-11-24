import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from './../../../auth/shared/services/authentication.service';
import { Injectable } from "@angular/core";

@Injectable()

export class UserInfoService{
    constructor(
        public af:AngularFireDatabase,
        private as: AuthenticationService
    ){}

    get user() {
        return this.as.loggedInUser.uid;
    }

    async createUserInfo(value){
        await this.af.list(`user-info/${this.user}`).push(value);
    }


}