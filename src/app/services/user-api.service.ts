import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    private url = 'https://api.github.com/users?since=:searchNumber';

    constructor(private http: HttpClient) {
    }

    public downloadUsers(startWith: number): Observable<IUser[]> {
        const url = this.url.replace(':searchNumber', startWith.toString());
        return this.http.get<IUser[]>(url);
    }
}