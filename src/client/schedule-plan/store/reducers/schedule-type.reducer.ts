import { ScheduleItem } from './../../models/schedule-plan.model';
import { Action } from '@ngrx/store'
import * as FromScheduleTypeActions from './../actions/schedule-type.action';

const initialState: any = {
    $key: null,
    type: null,
    selection: null,
    data: null,
    selectedDay: null,
}

export function scheduleTypeReducer(state: any[] = [initialState], action: FromScheduleTypeActions.ScheduleTypeActions) {

    switch(action.type) {
        case FromScheduleTypeActions.LOAD_PLAN:
            return {  ...action.payload };
        default:
            return state;
    }
}