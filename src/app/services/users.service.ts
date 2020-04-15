import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { UserApiService } from './user-api.service';
import { take, map } from 'rxjs/operators';
import { IUserRepo } from '../interfaces/user-repo.interface';
import { IUserDetails } from '../interfaces/user-details.interface';
import { IUserCombinedInfo } from '../interfaces/user-combined-info.interface';

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
    public userFollowers$: Observable<IUser[]>;
    public userCombinedInfo$: Observable<IUserCombinedInfo>;
    
    constructor(private userApiService: UserApiService) {
        // Load first batch of users
        this.newUsersOnScroll();
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
        this.userFollowers$ = this.userApiService.getUserFollowers(userName);
        
        this.userCombinedInfo$ = combineLatest(this.userDetails$, this.userRepos$, this.userFollowers$).pipe(
            map(([userDetails, userRepos, userFollowers]) => {
                return {
                    userDetails,
                    userRepos,
                    userFollowers
                }
            })
        )
    }
}