import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home/home-screen/home-screen.component';
import { UsersGuard } from './core/guards/users.guard';
import { LogoutComponent } from './home/logout/logout.component';
import { LibrariansChildGuard } from './core/guards/librarians-child.guard';
import { UsersChildGuard } from './core/guards/users-child.guard';
import { LoginComponent } from './auth/login/login.component';
import { LibrariansGuard } from './core/guards/librarians.guard';
import { RegistrationComponent } from './auth/registration/registration.component';
import { BookInfoComponent } from './books/book-info/book-info.component';
import { BooksListingComponent } from './books/books-listing/books-listing.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ClubsListingComponent } from './clubs/clubs-listing/clubs-listing.component';
import { AddClubComponent } from './clubs/add-club/add-club.component';
import { ClubDetailsComponent } from './clubs/club-details/club-details.component';
import { LibrariansLoginComponent } from './auth/librarians-login/librarians-login.component';

const routes: Routes = [
  {
    path: 'public',
    component: HomeScreenComponent,
    children: [
      {
        path: '',
        component: BooksListingComponent
      },
      {
        path: 'book/details',
        component: BookDetailsComponent
      },
      {
        path: 'register',
        component: RegistrationComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'public/login',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: HomeScreenComponent,
    canActivate: [UsersGuard],
    canActivateChild: [UsersChildGuard],
    children: [
      {
        path: '',
        component: HomeScreenComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'clubs/all',
        component: ClubsListingComponent
      },
      {
        path: 'clubs/details',
        component: ClubDetailsComponent
      },
      {
        path: 'clubs/add',
        component: AddClubComponent
      }
    ]
  },
  {
    path: 'admin',
    component: HomeScreenComponent,
    children: [
      {
        path: 'login',
        component: LibrariansLoginComponent
      }
    ]
  },
  {
    path: 'librarian',
    component: HomeScreenComponent,
    canActivate: [LibrariansGuard],
    canActivateChild: [LibrariansChildGuard],
    children: [
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'clubs/all',
        component: ClubsListingComponent
      },
      {
        path: 'clubs/details',
        component: ClubDetailsComponent
      }
    ]
  }
];

export const routing = RouterModule.forRoot(routes, {});
