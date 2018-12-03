import { ScheduleItem } from './../client/schedule-plan/models/schedule-plan.model';
import { User } from './../auth/shared/models/auth.model';

export interface AppState {
    user: User;
    schedule: ScheduleItem;
    scheduleType: any;
}