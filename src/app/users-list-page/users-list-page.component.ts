import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { IUser } from "../interfaces/user.interface"
import { UserApiService } from '../services/user-api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { UsersService } from '../services/users.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
    selector: "app-users-list-page",
    templateUrl: "./users-list-page.component.html",
    styleUrls: ["./users-list-page.component.css"]
})
export class UsersListPage implements OnInit {
    @ViewChild(CdkVirtualScrollViewport)
    viewport: CdkVirtualScrollViewport;

    public users$: Observable<IUser[]> = this.usersService.users$;
    public offset: BehaviorSubject<IUser[]> = new BehaviorSubject([]);

    constructor(private usersService: UsersService){}

    ngOnInit() {
        this.usersService.newUsersOnScroll();
    }

    @HostListener("window:scroll", [])
    onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.usersService.newUsersOnScroll();
        }
    }

    trackByIdx(i) {
        return i;
    }
}