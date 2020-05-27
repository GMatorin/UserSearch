import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { IUser } from '../models/user';
import { IUserDetails } from '../models/user-details';
import { IUserRepo } from '../models/user-repo';
import { UserApiError } from '../models/user-api-error';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    private actions = {
        getUsers: 'https://api.github.com/users?since=:searchNumber',
        getUserDetails: 'https://api.github.com/users/:userName',
        getRepos: 'https://api.github.com/users/:userName/repos',
        getFollowers: 'https://api.github.com/users/:userName/followers'
    };

    constructor(private http: HttpClient) {
    }

    public downloadUsers(startWith: number): Observable<IUser[] | UserApiError> {
        const url = this.actions.getUsers.replace(':searchNumber', startWith.toString());
        return this.http.get<IUser[]>(url)
            .pipe(
                catchError(err => this.handleHttpError(err))
            );
    }

    public getUserDetails(userName: string): Observable<IUserDetails> {
        const url = this.actions.getUserDetails.replace(':userName', userName.toString());
        return this.http.get<IUserDetails>(url);
    }

    public getUserRepos(userName: string): Observable<IUserRepo[]> {
        const url = this.actions.getRepos.replace(':userName', userName.toString());
        return this.http.get<IUserRepo[]>(url);
    }

    public getUserFollowers(userName: string): Observable<IUser[]> {
        const url = this.actions.getFollowers.replace(':userName', userName.toString());
        return this.http.get<IUser[]>(url);
    }

    private handleHttpError(error: HttpErrorResponse): Observable<UserApiError> {
        let errorData = new UserApiError();
        errorData.errorNumber = 100;
        errorData.message = error.statusText;
        errorData.friendlyMessage = "An error ocurred while receiving user data";
        return throwError(errorData);
    }
}