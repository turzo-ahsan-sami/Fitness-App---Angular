import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'list-items',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['list-items.component.scss'],
    template: `
    <div class="container-fluid" style="margin-top: 10px">
    
  
    <div class="table-row">
      <div class="wrapper attributes">
        <div class="wrapper title-comment-module-reporter">
          <div class="wrapper title-comment">
            <div class="column title">App crashes when dragged by title bar</div>
            <div class="column comment">Eddie, can you please take a look. We want this fixed pretty soon.</div>
          </div>
          
       
     </div>
       
        <div class="wrapper dates">
            <div class="column date">Feb-1, 2016</div>
            <div class="column date">Mar-13, 2016</div>
            <div class="column date">Apr-4, 2016</div>
        </div>
    </div>
  
    
  
  </div>
        <li>
            {{ item | json }}
           
            
            <button type="button" (click)="removeItem(item.key)">Remove</button>
            <a [routerLink]="getRouteType(item)">Edit</a>
        </li>
    `
})

export class ListItemsComponent{
    @Input()
    item: any;

    @Output()
    remove = new EventEmitter<any>();

    removeItem(item: any){
        this.remove.emit(item);
    }

    getRouteType(item: any){
        return [`../${item.ingredients? 'workout-guide': 'meal-recipe'}`, item.key];
    }
}