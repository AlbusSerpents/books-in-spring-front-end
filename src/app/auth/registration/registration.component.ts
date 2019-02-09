import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { AlertService } from '../../core/alerts/alert.service';
import { AuthService } from '../services/auth.service';
import { FormService } from '../../core/forms/forms.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ErrorResponse, ErroCode } from '../../core/http/error.response';
import {
  RegistrationRequest,
  newRegistrationRequest
} from '../models/auth.interfaces';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../auth.form.css', './registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private registrationSub$: Subscription;

  request: RegistrationRequest = newRegistrationRequest();

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
    if (this.registrationSub$) {
      this.registrationSub$.unsubscribe();
    }
  }

  register(registrationForm: NgForm) {
    if (!registrationForm.valid) {
      this.forms.touchForm(registrationForm);
    } else {
      this.registrationSub$ = this.service.register(this.request).subscribe(
        success => {
          this.navigateToHome();
        },
        (error: ErrorResponse) => {
          console.log(error);
          const message = this.handleError(error);
          this.alertService.error(message);
        }
      );
    }
  }

  private handleError(response: ErrorResponse): string {
    switch (response.code) {
      case ErroCode.AUTHENTICATION_FAILED:
        return 'Registartion failed';
      case ErroCode.REGISTRATION_FAILED:
        return 'The name or email is already in use';
      case ErroCode.REQUEST_VALIDATION_FAILED:
        return 'Form fields are not filled correctly';
      default:
        return 'Unknown error occured';
    }
  }

  private navigateToHome(): void {
    this.router.navigate(['user']);
  }
}
