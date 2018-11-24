import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => WorkoutTypeComponent)
};


@Component({
    selector: 'workout-type',
    styleUrls: ['workout-type.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TYPE_CONTROL_ACCESSOR],
    template: `
        <div *ngFor="let type of types" (click)="onSelect(type)" [class.active]="type === selection">
            <h3>{{ type }}</h3>
        </div>
    `
})

export class WorkoutTypeComponent implements ControlValueAccessor {
    
    selection: string;
    types = ['cardio','weight'];

    onTouch: Function;
    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }

    onModelChange: Function;
    registerOnChange(fn: any) {
        this.onModelChange = fn;
    }

    onSelect(value: string) {
        this.selection = value;
        this.onModelChange(value);
        this.onTouch();
    }

    writeValue(value: any) {
        this.selection = value;
    } 
}