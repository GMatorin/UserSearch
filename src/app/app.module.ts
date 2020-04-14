import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersListPage } from './users-list-page/users-list-page.component';
import { HttpClientModule } from '@angular/common/http';
import { UserApiService } from '../app/services/user-api.service'
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    UserApiService,
    UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
