import { UsersListPageComponent } from "./users-list-page.component";
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { UsersService } from '../services/users.service';

describe('UsersListPageComponent', () => {
    let component: UsersListPageComponent;
    let fixture: ComponentFixture<UsersListPageComponent>;
    let de: DebugElement;
    let mockUsersService = jasmine.createSpyObj(['filterByName']);

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations: [UsersListPageComponent],
            providers: [
                {provide: UsersService, useValue: mockUsersService},
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersListPageComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        fixture.detectChanges();
    });

    it("Should be truthy", () => {
        expect(component).toBeTruthy();
    })

    it("Should receive ")

});