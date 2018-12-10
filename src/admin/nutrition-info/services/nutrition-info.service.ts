//import { switchMap, map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';
//import { Observable } from 'rxjs';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";

import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class NutritionInfoService{

    feedCollection : AngularFirestoreCollection<any>;
    feedItem : Observable<any[]>;

    bodyType;
    test;
    constructor(
        public afs: AngularFirestore
    ){

    
        // const test = afs.collection('nutrition-info').doc('weight-gain').valueChanges();
        // console.log(test);

        this.bodyType = this.afs.collection('user-info').doc('5I8TTANA98Zt4SPo4gKi1J2tdru1')
            .ref
            .get()
            .then( doc => {
                const data = this.afs.collection('nutrition-info').doc(doc.data().bodyType).ref.get()
                .then(results => {
                    const a = results.data()
                    return a;
                });
                return data;
            });
             //doc.data().bodyType


        // let result = afs.collection('user-info').doc('5I8TTANA98Zt4SPo4gKi1J2tdru1').get()
        //     result.forEach(doc => {
        //         const data = {
        //             'bodyType': doc.data().bodyType
        //         }
        //         return this.bodyType = data;
        //     })    
;
    }

    async createNutritionInfo(value){
        await this.afs.collection('nutrition-info').doc(value.bodyType).set(value);
    }

    private accountLogCollection: AngularFirestoreCollection<any>;
    accountLogs: Observable<any[]>;
    getData(){
       
       
           
    }

    nutrientsInfoForWeightGain$: Observable<any> = this.afs.collection('nutrition-info').doc('weight-gain').valueChanges();
    nutrientsInfo$ =
        this.afs.collection('user-info').doc('5I8TTANA98Zt4SPo4gKi1J2tdru1')
        .ref
        .get()
        .then( doc => {
            this.afs.collection('nutrition-info').doc(doc.data().bodyType).valueChanges();
        })

    
    testing$ = this.afs.collection('user-info').doc('5I8TTANA98Zt4SPo4gKi1J2tdru1')
    .ref
    .get()
    .then( doc => {
        const data = this.afs.collection('nutrition-info').doc('weight-gain').ref.get()
        .then(results => {
            const a = results.data()
            console.log(a);
            return a;
        });
       // console.log(doc.data().bodyType)
       // return data;
    });
}