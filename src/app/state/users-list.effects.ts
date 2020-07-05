import { Injectable } from "@angular/core";
import { Observable, of, pipe } from 'rxjs';
import * as usersListActions from "./users-list.action";
import { ofType, Effect, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UserApiService } from '../services/user-api.service';
import { IUser } from '../models/user';
import { Action } from '@ngrx/store';

@Injectable()
export class UsersListEffects {
    constructor(
        private actions$: Actions,
        private usersApiService: UserApiService
        ) {}
    
    @Effect()
    loadUsers$: Observable<Action> = this.actions$.pipe(
        ofType(usersListActions.UsersListActionTypes.Load),
        mergeMap((action: usersListActions.Load) => this.usersApiService.downloadUsers(action.payload)
            .pipe(
                map((users: IUser[]) => new usersListActions.LoadSuccess(users)),
                catchError(err => of(new usersListActions.LoadFail(err)))
            )
        )
    )
}