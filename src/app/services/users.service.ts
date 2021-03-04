import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { IUser } from '../models/user';
import { UserApiService } from './user-api.service';
import { take, map } from 'rxjs/operators';
import { IUserRepo } from '../models/user-repo';
import { IUserDetails } from '../models/user-details';
import { IUserCombinedInfo } from '../models/user-combined-info';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject([]);
    private usersCache: IUser[] = [];
    public users$ = this.usersSubject.asObservable();
    private lastUserIndex = 0;

    public userRepos$: Observable<IUserRepo[]>;
    public userDetails$: Observable<IUserDetails>;
    public userFollowers$: Observable<IUser[]>;
    public userCombinedInfo$: Observable<IUserCombinedInfo>;
    
    constructor(private userApiService: UserApiService) {
    }

    // Start initial stream of users
    // Param: startWith signifies from which user's number to start the stream
    public startNewUserStream(startWith: number): void {
        // If users cache is not empty, clear the last search result and start new stream
        if(this.usersCache.length > 0) {
            this.usersCache = [];
            this.usersSubject.next(this.usersCache);
        }
        // Set lastUserIndex to startWith to download the right users batch
        this.lastUserIndex = startWith;
        this.getNextUsersBatch();
    }

    // Downloads next users batch depending on the last downloaded user
    public getNextUsersBatch(): void {
        // Call userApiService api method to download new users
        // and put them into Subject to update the UI of components
        this.userApiService.downloadUsers(this.lastUserIndex)
        .pipe(take(1))
        .subscribe((users: IUser[]) => {
            this.usersCache.push(...users);
            this.usersSubject.next(this.usersCache);
            this.lastUserIndex = this.usersCache[this.usersCache.length - 1].id;
        });
    }

    // Filters out names of users which match the incoming parameter
    // Param: name to match
    public filterByName(name: string): void {
        if(name.length > 0) {
            this.usersSubject.next(
                this.usersCache.filter(user => user.login.slice(0,name.length) === name)
            );
        } else {
            this.usersSubject.next(this.usersCache);
        }
    }

    // Downloads info for user details page and combines returned
    // streams into one stream
    // Param: name of requested user
    public startUserDetailsPageStream(userName: string): void {
        this.userDetails$ = this.userApiService.getUserDetails(userName);
        this.userRepos$ = this.userApiService.getUserRepos(userName);
        this.userFollowers$ = this.userApiService.getUserFollowers(userName);
        
        // Combine needed streams for the user details page into one stream
        this.userCombinedInfo$ = combineLatest(
            this.userDetails$, 
            this.userRepos$, 
            this.userFollowers$
        )
        .pipe(
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