import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { UserApiService } from './user-api.service';
import { map, tap, startWith, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject([]);
    private usersCash: IUser[] = [];
    public users$ = this.usersSubject.asObservable();
    private lastUserIndex = 0;
    
    constructor(private userApiService: UserApiService) {
    }

    public newUsersOnScroll(): void {
        this.userApiService.downloadUsers(this.lastUserIndex)
        .pipe(take(1))
        .subscribe(users => {
            this.usersCash.push(...users);
            this.usersSubject.next(this.usersCash);
            this.lastUserIndex = this.usersCash[this.usersCash.length - 1].id;
            console.log(this.usersCash.length);
        });
    }

}