import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'splitString' })

export class SplitStringPipe implements PipeTransform{
    
    transform(data){
        return  Array.isArray(data) ? data.join(', '): data;
    }
}