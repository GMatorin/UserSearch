import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { IUser } from "../interfaces/user.interface"
import { Observable, BehaviorSubject } from 'rxjs';
import { IUserRepo } from '../interfaces/user-repo.interface';
import { IUserDetails } from '../interfaces/user-details.interface';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "./user-details.component.html",
    styleUrls: ["./user-details.component.css"]
})
export class UserDetailsComponent {
    public userRepos$: Observable<IUserRepo[]> = this.usersService.userRepos$;
    public userDetails$: Observable<IUserDetails> = this.usersService.userDetails$;

    constructor(
        private usersService: UsersService,
        private activatedRoute: ActivatedRoute,) {}

}