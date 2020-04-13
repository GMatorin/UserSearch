import { Component, OnInit } from "@angular/core";
import { IUser } from "../dtos/user.dto"

@Component({
    selector: "app-users-list-page",
    templateUrl: "./users-list-page.component.html",
    styleUrls: ["./users-list-page.component.css"]
})
export class UsersListPage implements OnInit {
    public users: IUser[] = usersArr;

    ngOnInit() {
        this.users.forEach(user => {
            console.log(user);
        })
    }
}

const usersArr = [
    {
      "login": "ivey",
      "id": 6,
      "node_id": "MDQ6VXNlcjY=",
      "avatar_url": "https://avatars0.githubusercontent.com/u/6?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/ivey",
      "html_url": "https://github.com/ivey",
      "followers_url": "https://api.github.com/users/ivey/followers",
      "following_url": "https://api.github.com/users/ivey/following{/other_user}",
      "gists_url": "https://api.github.com/users/ivey/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/ivey/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/ivey/subscriptions",
      "organizations_url": "https://api.github.com/users/ivey/orgs",
      "repos_url": "https://api.github.com/users/ivey/repos",
      "events_url": "https://api.github.com/users/ivey/events{/privacy}",
      "received_events_url": "https://api.github.com/users/ivey/received_events",
      "type": "User",
      "site_admin": false
    },
    {
      "login": "evanphx",
      "id": 7,
      "node_id": "MDQ6VXNlcjc=",
      "avatar_url": "https://avatars0.githubusercontent.com/u/7?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/evanphx",
      "html_url": "https://github.com/evanphx",
      "followers_url": "https://api.github.com/users/evanphx/followers",
      "following_url": "https://api.github.com/users/evanphx/following{/other_user}",
      "gists_url": "https://api.github.com/users/evanphx/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/evanphx/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/evanphx/subscriptions",
      "organizations_url": "https://api.github.com/users/evanphx/orgs",
      "repos_url": "https://api.github.com/users/evanphx/repos",
      "events_url": "https://api.github.com/users/evanphx/events{/privacy}",
      "received_events_url": "https://api.github.com/users/evanphx/received_events",
      "type": "User",
      "site_admin": false
    },
    {
      "login": "vanpelt",
      "id": 17,
      "node_id": "MDQ6VXNlcjE3",
      "avatar_url": "https://avatars1.githubusercontent.com/u/17?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/vanpelt",
      "html_url": "https://github.com/vanpelt",
      "followers_url": "https://api.github.com/users/vanpelt/followers",
      "following_url": "https://api.github.com/users/vanpelt/following{/other_user}",
      "gists_url": "https://api.github.com/users/vanpelt/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/vanpelt/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/vanpelt/subscriptions",
      "organizations_url": "https://api.github.com/users/vanpelt/orgs",
      "repos_url": "https://api.github.com/users/vanpelt/repos",
      "events_url": "https://api.github.com/users/vanpelt/events{/privacy}",
      "received_events_url": "https://api.github.com/users/vanpelt/received_events",
      "type": "User",
      "site_admin": false
    }]