import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../services/home.service';

import { LoginRequest, User } from '../interfaces/login.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../core/alerts/alert.service';
import { ErrorResponse } from '../../core/http/error.response';
import { Navbar } from '../interfaces/nav-bar.interfaces';
import { last } from '@angular/router/src/utils/collection';
import { AuthStorageService } from '../../core/auth/auth-storage.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent {
  private userNavbar: Navbar = {
    items: [
      { label: 'Profile', link: ['user', 'profile'] },
      { label: 'Poll', link: ['user', 'poll'] },
      { label: 'Events', link: ['user', 'events'] },
      { label: 'Clubs', link: ['user', 'clubs', 'all'] },
      { label: 'Logout', link: ['user', 'logout'] }
    ]
  };

  private publicNavbar: Navbar = {
    items: [
      { label: 'Register', link: ['public', 'register'] },
      { label: 'Login', link: ['public', 'login'] }
    ]
  };

  private librarianNavbar: Navbar = {
    items: [
      { label: 'Users', link: ['librarian', 'users'] },
      { label: 'Poll', link: ['librarian', 'poll'] },
      { label: 'Events', link: ['librarian', 'events'] },
      { label: 'Clubs', link: ['librarian', 'clubs', 'all'] },
      { label: 'Logout', link: ['librarian', 'logout'] }
    ]
  };

  constructor(private authService: AuthStorageService) {}

  getNavbar(): Navbar {
    if (this.authService.isLibrarian()) {
      return this.librarianNavbar;
    } else if (this.authService.isUser()) {
      return this.userNavbar;
    } else {
      return this.publicNavbar;
    }
  }
}
