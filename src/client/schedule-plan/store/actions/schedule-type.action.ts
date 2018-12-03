import { Action } from '@ngrx/store'

export const UPDATE_PLAN = '[SCHEDULE_TYPE] Update'
export const LOAD_PLAN = '[SCHEDULE_TYPE] Load'



export class UpdateType implements Action {
    readonly type = UPDATE_PLAN
    constructor(public payload?: any) {}
}

export class LoadType implements Action {
    readonly type = LOAD_PLAN;
    constructor(public payload: any) {}
  }

export type ScheduleTypeActions =   UpdateType | LoadType

