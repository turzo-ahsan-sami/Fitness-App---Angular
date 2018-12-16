import { RouterModule } from '@angular/router';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { SharedUIModule } from 'src/shared-UI/sharedUI.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports:[
        CommonModule,
        SharedUIModule,
        RouterModule
    ],
    declarations:[
        ListItemsComponent
    ],
    exports: [
        ListItemsComponent
    ]

})

export class SharedModule{

}