import { CommonModule } from '@angular/common';
import { SpinningIconComponent } from './UI/spinning-icon/spinning-icon.component';
import { NgModule } from '@angular/core';
import { VerticalBarPipe } from './pipes/vertical-bar/vertical-bar.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SpinningIconComponent,
        VerticalBarPipe
    ],
    exports: [
        SpinningIconComponent,
        VerticalBarPipe
    ]
})

export class SharedUIModule{}