import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../services/home.service';

import { LoginRequest, User } from '../interfaces/login.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../core/alerts/alert.service';
import { ErrorResponse } from '../../core/http/error.response';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnDestroy {
  private sub$: Subscription;

  constructor(
    private service: HomeService,
    private router: Router,
    private alertService: AlertService
  ) {}

  public login() {
    const loginRequest: LoginRequest = {
      email: 'abc@example.com',
      password: '1234'
    };

    this.sub$ = this.service.login(loginRequest).subscribe(
      next => {},
      (error: ErrorResponse) => {
        if (error.message) {
          this.alertService.error(error.message);
        } else {
          this.alertService.error(error.code);
        }
      },
      () => {
        this.router.navigateByUrl('/profile');
      }
    );
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
