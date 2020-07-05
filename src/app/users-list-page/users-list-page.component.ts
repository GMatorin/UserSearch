import { Component, OnInit, HostListener, AfterViewInit, OnChanges, AfterContentInit } from "@angular/core";
import { IUser } from "../models/user"
import { Observable, BehaviorSubject } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Store } from '@ngrx/store';
import * as fromUsersList from '../state/users-list.reducer'
import * as usersListActions from '../state/users-list.action'

@Component({
    templateUrl: "./users-list-page.component.html",
    styleUrls: ["./users-list-page.component.css"]
})
export class UsersListPageComponent implements OnInit, AfterContentInit {
    public users$: Observable<IUser[]> = this.usersService.users$;
    userName: string = '';
    startWith: number;

    constructor(
        private usersService: UsersService,
        private store: Store<fromUsersList.State>
        ){
        this.usersService.getNextUsersBatch();
    }

    ngOnInit() {
        this.store.dispatch(new usersListActions.Load(0));
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
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.userName.length === 0) {
                this.usersService.getNextUsersBatch();
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