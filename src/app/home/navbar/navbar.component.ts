import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { AlertService } from '../../core/alerts/alert.service';
import { Subscription } from 'rxjs';
import { Navbar } from '../interfaces/nav-bar.interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input()
  public navbar: Navbar;

  constructor(private router: Router) {}

  public redirect(url: string[]): void {
    this.router.navigate(url);
  }

  public navigateHome(): void {
    this.router.navigate(['home']);
  }
}
