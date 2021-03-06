import { Component } from "@angular/core";
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { IUserCombinedInfo } from '../models/user-combined-info';

@Component({
    templateUrl: "./user-details.component.html",
    styleUrls: ["./user-details.component.css"]
})
export class UserDetailsComponent {
    public userCombinedInfo$: Observable<IUserCombinedInfo> = this.usersService.userCombinedInfo$;

    constructor(
        private usersService: UsersService) {}

}