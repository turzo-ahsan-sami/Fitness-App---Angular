import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from './../../../auth/shared/services/authentication.service';
import { Injectable } from "@angular/core";

@Injectable()

export class UserInfoService{
    constructor(
        public af:AngularFireDatabase,
        private as: AuthenticationService,
        private afs: AngularFirestore
    ){}

    get user() {
        return this.as.loggedInUser.uid;
    }

    getUserInfo(){
        return this.afs.collection('user-info').doc('5I8TTANA98Zt4SPo4gKi1J2tdru1').valueChanges();
    }

    async createUserInfo(value){
       // await this.af.list(`user-info/${this.user}`).push(value);
        await this.afs.collection('user-info').doc(`${this.user}`).set(value);
    }


}