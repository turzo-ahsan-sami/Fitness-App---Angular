export interface SchedulePlan {
    
}

export interface ScheduleItem {
    $key?: string;
    Breakfast?: any[];
    Lunch?: any[];
    Dinner?: any[];
    Supper?: any[];
    Workout?: any[];
    section: string;
    timestamp: number;
  }