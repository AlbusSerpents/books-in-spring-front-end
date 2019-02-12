import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorResponse, ErroCode } from '../../core/http/error.response';
import { Subscription } from 'rxjs';
import {
  LibrariansLoginRequest,
  newLibrariansLoginRequest
} from '../models/auth.interfaces';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { AlertService } from '../../core/alerts/alert.service';
import { AuthService } from '../services/auth.service';
import { FormService } from '../../core/forms/forms.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-librarians-login',
  templateUrl: './librarians-login.component.html',
  styleUrls: ['../auth.form.css', './librarians-login.component.css']
})
export class LibrariansLoginComponent implements OnInit, OnDestroy {
  private loginSub$: Subscription;

  request: LibrariansLoginRequest = newLibrariansLoginRequest();

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
      this.loginSub$ = this.service.librariansLogin(this.request).subscribe(
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
