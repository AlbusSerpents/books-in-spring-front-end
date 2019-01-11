import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../services/home.service';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { User } from '../interfaces/login.interface';
import { Subscribable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../../core/alerts/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user: User;

  private userSub$: Subscription;
  private logoutSub$: Subscription;

  constructor(
    private router: Router,
    private service: HomeService,
    private alertService: AlertService,
    private authService: AuthStorageService
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile() {
    const userId = this.authService.getUserId();
    this.userSub$ = this.service.getProfile(userId).subscribe(user => {
      this.user = user;
    });
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
    if (this.userSub$) {
      this.userSub$.unsubscribe();
    }
    if (this.logoutSub$) {
      this.logoutSub$.unsubscribe();
    }
  }
}
