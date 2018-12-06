import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from './../../../auth/shared/services/authentication.service';
import { Injectable } from "@angular/core";

@Injectable()

export class UserInfoService{
    userId: any;
    constructor(
        public af:AngularFireDatabase,
        private as: AuthenticationService,
        private afs: AngularFirestore
    ){
        this.as.authState.subscribe(user => {
            if(user){
                this.userId = user.uid;
            }
            console.log(this.userId);
        });
    }

    get user() {
       // return this.as.loggedInUser.uid;
       return this.as.currentUser;
    }

    
    get current(){
        return this.as.authState.subscribe(user => {
            if(user){
                return user.uid;
            }
        });
    }

    userInfo$: Observable<any> = this.afs.collection('user-info').doc('5I8TTANA98Zt4SPo4gKi1J2tdru1').valueChanges();
    // getUserInfo(){
    //     console.log(this.userId);
    //     return this.afs.collection('user-info').doc(`${this.userId}`).valueChanges();
    // }

    async createUserInfo(value){
       // await this.af.list(`user-info/${this.user}`).push(value);
        await this.afs.collection('user-info').doc(`${this.user}`).set(value);
    }


}