import { Action } from '@ngrx/store';
import { IUserCombinedInfo } from '../models/user-combined-info';

export enum UserDetailsActionTypes {
    Load = "[UserDetails] Load",
    LoadSuccess = '[UserDetails] Load Success',
    LoadFail = '[UserDetails] Load Fail'
};

export class Load implements Action {
    readonly type = UserDetailsActionTypes.Load;

    constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
    readonly type = UserDetailsActionTypes.LoadSuccess;

    constructor(public payload: IUserCombinedInfo) {}
}

export class LoadFail implements Action {
    readonly type = UserDetailsActionTypes.LoadFail;

    constructor(public payload: String) {}
}

export type UserDetailsActions = Load
            | LoadSuccess
            | LoadFail;
