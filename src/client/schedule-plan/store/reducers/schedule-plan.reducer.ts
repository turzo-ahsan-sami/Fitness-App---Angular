import { ScheduleItem } from './../../models/schedule-plan.model';
import { Action } from '@ngrx/store'
import * as FromScheduleActions from './../actions/schedule-plan.action';

const initialState: ScheduleItem = {
    $key: null,
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Supper: [],
    Workout: [],
    section: null,
    timestamp: null,
}

export function schedulePlanReducer(state: ScheduleItem[] = [initialState], action: FromScheduleActions.ScheduleActions) {

    switch(action.type) {
        case FromScheduleActions.CREATE_PLAN:
            return {...state, ...action.payload };
        case FromScheduleActions.LOAD_PLAN:
            return {  ...action.payload };
        default:
            return state;
    }
}