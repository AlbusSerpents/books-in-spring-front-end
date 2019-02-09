import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { AlertService } from '../../core/alerts/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public loggedIn = false;

  private logoutSub$: Subscription;

  constructor(
    private router: Router,
    private service: HomeService,
    private alertService: AlertService,
    private authService: AuthStorageService
  ) {}

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
  }

  public login() {
    this.router.navigate(['login']);
  }

  public register() {
    this.router.navigate(['register']);
  }

  public profile() {
    this.router.navigate(['profile']);
  }

  public poll() {
    this.router.navigate(['poll']);
  }

  public events() {
    this.router.navigate(['profile']);
  }

  public clubs() {
    this.router.navigate(['clubs']);
  }

  public logout() {
    this.logoutSub$ = this.service.logout().subscribe(
      next => {},
      err => {
        this.alertService.error(err);
      },
      () => {
        this.router.navigate(['home']);
      }
    );
  }

  ngOnDestroy() {
    if (this.logoutSub$ != null) {
      this.logoutSub$.unsubscribe();
    }
  }
}
