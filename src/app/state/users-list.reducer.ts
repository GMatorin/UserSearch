import { IUser } from '../models/user';
import * as fromRoot from './app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersListActions, UsersListActionTypes } from './users-list.action';

export interface UsersListState {
    users: IUser[];
    error: String;
}

// export interface State extends fromRoot.State {
//     users: UsersListState;
// }

const initialState: UsersListState = {
    users: [],
    error: ''
}

const getUsersListState = createFeatureSelector<UsersListState>('users');

export const getUsers = createSelector(
    getUsersListState,
    state => {
        return state ? state.users : [];
    }
);

export const getError = createSelector(
    getUsersListState,
    state => state.error
);

export const getUsersListLastIndex = createSelector(
    getUsersListState,
    state => state ? state.users[state.users.length - 1].id : null
);

export function reducer(state = initialState, action: UsersListActions): UsersListState {
    switch(action.type) {
        case UsersListActionTypes.LoadSuccess:
            const oldState = state;
            const newData = action.payload
            return {
                ...state,
                users: action.payload,
                error: ''
            }
        case UsersListActionTypes.LoadFail:
            return {
                ...state,
                users: [],
                error: action.payload
            }
    }
}
