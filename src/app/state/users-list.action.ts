import { Action } from '@ngrx/store';
import { IUser } from '../models/user';

export enum UsersListActionTypes {
    Load = "[UsersList] Load",
    LoadSuccess = '[UsersList] Load Success',
    LoadFail = '[UsersList] Load Fail',
    GetLastUserIndex = '[UsersList] Get Last User Index'
};

export class Load implements Action {
    readonly type = UsersListActionTypes.Load;
    
    constructor(public payload: number) {}
}

export class LoadSuccess implements Action {
    readonly type = UsersListActionTypes.LoadSuccess;

    constructor(public payload: IUser[]) {}
}

export class LoadFail implements Action {
    readonly type = UsersListActionTypes.LoadFail;

    constructor(public payload: String) {}
}

export type UsersListActions = Load
            | LoadSuccess
            | LoadFail;