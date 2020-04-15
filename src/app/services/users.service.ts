import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { UserApiService } from './user-api.service';
import { take } from 'rxjs/operators';
import { IUserRepo } from '../interfaces/user-repo.interface';
import { IUserDetails } from '../interfaces/user-details.interface';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject([]);
    private usersCash: IUser[] = [];
    public users$ = this.usersSubject.asObservable();
    private lastUserIndex = 0;
    public userSearchValue = '';
    public userRepos$: Observable<IUserRepo[]>;
    public userDetails$: Observable<IUserDetails>;
    
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

    filterByName(name: string) {
        if(name.length > 0) {
            this.usersSubject.next(
                this.usersCash.filter(user => user.login.slice(0,name.length) === name)
            );
        } else {
            this.usersSubject.next(this.usersCash);
        }
    }

    getUserDetailsPageInfo(userName: string) {
        this.userDetails$ = this.userApiService.getUserDetails(userName);
        this.userRepos$ = this.userApiService.getUserRepos(userName);
    }
}