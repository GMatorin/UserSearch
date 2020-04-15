import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersListPageComponent } from './users-list-page/users-list-page.component';
import { HttpClientModule } from '@angular/common/http';
import { UserApiService } from '../app/services/user-api.service'
import { UsersService } from './services/users.service';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    UsersListPageComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
       {path: 'users', component: UsersListPageComponent},
       {path: 'users/:userName', component: UserDetailsComponent},
       {path: '', redirectTo: 'users', pathMatch: 'full'},
       {path: '**', redirectTo: 'users', pathMatch: 'full'},
    ])
  ],
  providers: [
    UserApiService,
    UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
