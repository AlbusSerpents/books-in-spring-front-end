import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home/home-screen/home-screen.component';
import { ProfileComponent } from './home/profile/profile.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeScreenComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

export const routing = RouterModule.forRoot(routes, {});
