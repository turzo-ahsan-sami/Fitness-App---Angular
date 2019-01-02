import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './../../../auth/shared/services/authentication.service';
import { Injectable } from "@angular/core";

@Injectable()

export class UserInfoService{
   
    constructor(
        private as: AuthenticationService,
        private afs: AngularFirestore
    ){}

    get user() {
       return this.as.loggedInUser.uid;
    }

    
    get current(){
        return this.as.authState.subscribe(user => {
            if(user){
                return user.uid;
            }
        });
    }

    userInfo$: Observable<any> = this.afs.collection('user-info').doc(`${this.user}`).snapshotChanges();
    // getUserInfo(){
    //     console.log(this.userId);
    //     return this.afs.collection('user-info').doc(`${this.userId}`).valueChanges();
    // }

    createUserInfo(value){
        this.afs.collection('user-info').doc(`${this.user}`).set(value);
    }

    updateUserInfo(value){
        return this.afs.collection('user-info').doc(`${this.user}`).update(value);
    }


}