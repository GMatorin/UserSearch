import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { IUserDetails } from '../interfaces/user-details.interface';
import { IUserRepo } from '../interfaces/user-repo.interface';

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

    public downloadUsers(startWith: number): Observable<IUser[]> {
        const url = this.actions.getUsers.replace(':searchNumber', startWith.toString());
        return this.http.get<IUser[]>(url);
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
}