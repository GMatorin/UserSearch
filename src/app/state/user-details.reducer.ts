import { IUserDetails } from '../models/user-details';
import * as fromRoot from './app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserDetailsActions, UserDetailsActionTypes } from './user-details.actions';
import { IUserCombinedInfo } from '../models/user-combined-info';

export interface UserDetailsState {
    userDetails: IUserCombinedInfo;
    error: String;
}

export interface State extends fromRoot.State {
    userDetails: IUserCombinedInfo;
}

const initialState: UserDetailsState = {
    userDetails: null,
    error: ''
}

const getUserDetailsState = createFeatureSelector<UserDetailsState>('userDetails');

export const getUserDetails = createSelector(
    getUserDetailsState,
    state => state ? state.userDetails : {}
);

export const getError = createSelector(
    getUserDetailsState,
    state => state.error
);

export function reducer(state = initialState, action: UserDetailsActions): UserDetailsState {
    switch(action.type) {
        case UserDetailsActionTypes.LoadSuccess:
            return {
                ...state,
                userDetails: action.payload,
                error: ''
            }
        case UserDetailsActionTypes.LoadFail:
            return {
                ...state,
                userDetails: null,
                error: action.payload
            }
    }
}
