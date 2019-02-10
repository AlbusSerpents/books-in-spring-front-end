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
      }
    ]
  }
];

export const routing = RouterModule.forRoot(routes, {});
