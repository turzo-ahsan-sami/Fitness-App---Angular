import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
    name: 'searchFilter' 
})

export class SearchFilterPipe implements PipeTransform {
  transform(items: any, searchText: any): any {
        if(searchText == null) return items;

        return items.filter(function(item){
            const workouts = [item.name];
            
            for(let workout of workouts){
                return workout.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
            }       
        })
    }
}
