import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { NgForm, FormControl } from '@angular/forms';
import { AlertService } from '../../core/alerts/alert.service';
import { ErrorResponse, ErroCode } from '../../core/http/error.response';
import { FormService } from '../../core/forms/forms.service';
import { LoginRequest, newLoginRequest } from '../models/auth.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.form.css', './login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSub$: Subscription;

  request: LoginRequest = newLoginRequest();

  constructor(
    private storageService: AuthStorageService,
    private alertService: AlertService,
    private service: AuthService,
    private forms: FormService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.storageService.isLoggedIn() && this.storageService.isUser()) {
      this.navigateToHome();
    }
  }

  ngOnDestroy() {
    if (this.loginSub$) {
      this.loginSub$.unsubscribe();
    }
  }

  login(loginForm: NgForm) {
    if (!loginForm.valid) {
      this.forms.touchForm(loginForm);
    } else {
      this.loginSub$ = this.service.login(this.request).subscribe(
        success => {
          this.navigateToHome();
        },
        (error: ErrorResponse) => {
          const message = this.handleError(error);
          this.alertService.error(message);
        }
      );
    }
  }

  private handleError(response: ErrorResponse): string {
    switch (response.code) {
      case ErroCode.AUTHENTICATION_FAILED:
        return 'Login failed';
      case ErroCode.REQUEST_VALIDATION_FAILED:
        return 'Form fields are not filled correctly';
      default:
        return 'Unknown error occured';
    }
  }

  private navigateToHome(): void {
    this.router.navigate(['public']);
  }
}
