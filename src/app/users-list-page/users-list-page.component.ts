import { Component, OnInit, HostListener, AfterViewInit, OnChanges, AfterContentInit } from "@angular/core";
import { IUser } from "../models/user"
import { Observable, BehaviorSubject } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Store, select } from '@ngrx/store';
import * as fromUsersList from '../state/users-list.reducer'
import * as usersListActions from '../state/users-list.action'

@Component({
    templateUrl: "./users-list-page.component.html",
    styleUrls: ["./users-list-page.component.css"]
})
export class UsersListPageComponent implements OnInit, AfterContentInit {
    users: IUser[] = [];
    userName: string = '';
    startWith: number;
    lastUserId: number;
    private scrollLoadTouched = false;

    constructor(
        private usersService: UsersService,
        private store: Store<fromUsersList.UsersListState>
        ){
        // this.usersService.getNextUsersBatch();
    }

    ngOnInit() {
        this.store.dispatch(new usersListActions.Load(0));
        this.store.pipe(
            select(fromUsersList.getUsers),
            ).subscribe(users => {
            this.users = users;
        });
        this.store.pipe(select(fromUsersList.getUsersListLastIndex)).subscribe(lastUserId => {
            this.lastUserId = lastUserId;
        });
    }

    ngAfterContentInit() {
        // Refresh the filter by name functionality on components
        // initialization to prevent upload of new data on scroll
        // after returning to this page
        this.usersService.filterByName(this.userName);
    }

    // Upload new users on scroll
    @HostListener("window:scroll", [])
    onScroll(): void {
        if (!this.scrollLoadTouched && (window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.userName.length === 0) {
                // this.usersService.getNextUsersBatch();
                this.scrollLoadTouched = true;
                this.store.dispatch(new usersListActions.Load(this.lastUserId));
                setTimeout(() => {
                    this.scrollLoadTouched = false }, 100);
            }
    }

    trackByIdx(i) {
        return i;
    }

    onKey(e): void {
        this.usersService.filterByName(this.userName);
    }

    handleUserDetails(userName: string): void {
        this.usersService.startUserDetailsPageStream(userName);
    }

    downloadUsers(startWith: number): void {
        if(typeof(startWith) !== "number") {
            return;
        }
        this.usersService.startNewUserStream(startWith);
    }
}