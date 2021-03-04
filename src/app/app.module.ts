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

/* Feature Modules */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducer as usersListReducer } from './state/users-list.reducer';
import { reducer as userDetailsReducer } from './state/user-details.reducer'
import { UsersListEffects } from './state/users-list.effects';

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
    StoreModule.forRoot({
      users: usersListReducer,
      userDetails: userDetailsReducer
    },),
    EffectsModule.forRoot([UsersListEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Users Search',
      maxAge: 25,
      logOnly: false
    }),
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
