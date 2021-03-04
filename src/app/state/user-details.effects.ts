import { Injectable } from "@angular/core";
import { ofType, Effect, Actions } from '@ngrx/effects';
import { UserApiService } from '../services/user-api.service';
import { Observable, combineLatest, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as userDetailsActions from "./user-details.actions";
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IUserCombinedInfo } from '../models/user-combined-info';

@Injectable()
export class UserDetailsEffects {
    constructor(
        private actions$: Actions,
        private usersApiService: UserApiService
    ) {}

    @Effect()
    loadUserDetails$: Observable<Action> = this.actions$.pipe(
        ofType(userDetailsActions.UserDetailsActionTypes.Load),
        mergeMap((action: userDetailsActions.Load) => {
            return combineLatest(
                this.usersApiService.getUserDetails(action.payload), 
                this.usersApiService.getUserRepos(action.payload), 
                this.usersApiService.getUserFollowers(action.payload)
            )
            .pipe(
                map(([userDetails, userRepos, userFollowers]) => {
                    return {
                        userDetails,
                        userRepos,
                        userFollowers
                    }
                })
            ).pipe(
                map((userDetails: IUserCombinedInfo) => new userDetailsActions.LoadSuccess(userDetails)),
                catchError(err => of(new userDetailsActions.LoadFail(err)))
            )
        })
    )
}