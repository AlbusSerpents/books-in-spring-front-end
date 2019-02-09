import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home/home-screen/home-screen.component';
import { UsersGuard } from './core/guards/users.guard';
import { LogoutComponent } from './home/logout/logout.component';
import { LibrariansChildGuard } from './core/guards/librarians-child.guard';
import { UsersChildGuard } from './core/guards/users-child.guard';

const routes: Routes = [
  {
    path: 'user',
    canActivateChild: [UsersChildGuard],
    children: [
      {
        path: 'logout',
        component: LogoutComponent
      }
    ]
  },
  {
    path: 'librarian',
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
