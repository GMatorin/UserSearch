import { Component, OnInit, HostListener, AfterViewInit } from "@angular/core";
import { IUser } from "../interfaces/user.interface"
import { Observable, BehaviorSubject } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
    templateUrl: "./users-list-page.component.html",
    styleUrls: ["./users-list-page.component.css"]
})
export class UsersListPageComponent implements OnInit {
    public users$: Observable<IUser[]> = this.usersService.users$;
    public offset: BehaviorSubject<IUser[]> = new BehaviorSubject([]);
    userName: string = '';

    constructor(private usersService: UsersService){}

    ngOnInit() {
        this.usersService.filterByName(this.userName);
    }

    @HostListener("window:scroll", [])
    onScroll(): void {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.userName.length === 0) {
                this.usersService.newUsersOnScroll();
            }
        }

    trackByIdx(i) {
        return i;
    }

    onKey(e) {
        this.usersService.filterByName(this.userName);
    }

    handleUserDetails(userName: string) {
        this.usersService.getUserDetailsPageInfo(userName);
    }
}