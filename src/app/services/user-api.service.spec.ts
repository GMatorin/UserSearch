// import { UserApiService }

import { UserApiService } from "./user-api.service"
import { of, Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { IUser } from '../models/user';

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
    }];

describe("UserApiService", () => {
    let userApiService: UserApiService;
    let mockHttp;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj("mockHttp", ["get"]);
        userApiService = new UserApiService(mockHttp);
    })

    it("downloadUsers is called with right URLs", () => { 
        let url = "https://api.github.com/users?since=0";
        userApiService.downloadUsers(0);
        expect(mockHttp.get).toHaveBeenCalledWith(url);
    })

    it("downloadUsers returns an observable", () => { 
        mockHttp.get.and.returnValue(of(true));
        let url = "https://api.github.com/users?since=:searchNumber";
        let respond = userApiService.downloadUsers(0);
        expect(respond).toBeInstanceOf(Observable);
    })
})

describe("UserApiService everything together #2", () => {
    let userApiService: UserApiService;
    let httpTestingController: HttpTestingController;
    let usersMock = [...usersArr];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserApiService]
        });
        userApiService = TestBed.get(UserApiService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it("One http get request made with right url", () => {
        let url = "https://api.github.com/users?since=0";
        userApiService.downloadUsers(0).subscribe((users: IUser[]) => {
            expect(users.length).toBe(3);
        });;
        let usersRequest: TestRequest = httpTestingController.expectOne(url);
        expect(usersRequest.request.method).toEqual('GET');

        usersRequest.flush(usersMock);
        httpTestingController.verify(); 
    });
});