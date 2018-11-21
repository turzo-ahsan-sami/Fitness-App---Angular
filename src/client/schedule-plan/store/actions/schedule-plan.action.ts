import { ScheduleItem } from './../../models/schedule-plan.model';
import { Action } from '@ngrx/store'

export const CREATE_PLAN = '[SCHEDULE] Add'
export const UPDATE_PLAN = '[SCHEDULE] Remove'
export const LOAD_PLAN = '[SCHEDULE] Load'

export class CreatePlan implements Action {
    readonly type = CREATE_PLAN
    constructor(public payload: ScheduleItem) {}
}

export class UpdatePlan implements Action {
    readonly type = UPDATE_PLAN
    constructor(public payload?: any) {}
}

export class LoadPlan implements Action {
    readonly type = LOAD_PLAN;
    constructor(public payload: ScheduleItem) {}
  }

export type ScheduleActions = CreatePlan | UpdatePlan | LoadPlan

