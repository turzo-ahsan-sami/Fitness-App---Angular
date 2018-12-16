import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'verticalBar' })

export class VerticalBarPipe implements PipeTransform{
    
    transform(data){
        return Array.isArray(data) ? data.join(' | '): data
    }
}