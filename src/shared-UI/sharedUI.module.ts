import { CommonModule } from '@angular/common';
import { SpinningIconComponent } from './UI/spinning-icon/spinning-icon.component';
import { NgModule } from '@angular/core';
import { VerticalBarPipe } from './pipes/vertical-bar/vertical-bar.pipe';
import { SplitStringPipe } from './pipes/split-string/split-string.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SpinningIconComponent,
        VerticalBarPipe,
        SplitStringPipe
    ],
    exports: [
        SpinningIconComponent,
        VerticalBarPipe,
        SplitStringPipe
    ]
})

export class SharedUIModule{}