import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  newProfile,
  Profile,
  UpdateProfileRequest
} from '../models/profile.interfaces';
import { ProfileService } from '../services/profile.service';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormService } from '../../core/forms/forms.service';
import { AlertService } from '../../core/alerts/alert.service';
import { userInfo } from 'os';
import { ErrorResponse } from '../../core/http/error.response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private id: string;

  profile: Profile = newProfile();

  oldPassword: string;
  newPassword: string;
  newPasswordRepeated: string;

  private profile$: Subscription;
  private update$: Subscription;

  constructor(
    private service: ProfileService,
    authService: AuthStorageService,
    private formsService: FormService,
    private alertService: AlertService
  ) {
    this.id = authService.getUserId();
  }

  ngOnInit() {
    this.profile$ = this.service
      .getProfile(this.id)
      .subscribe(user => (this.profile = user));
  }

  updateProfile(form: NgForm) {
    if (!form.valid) {
      this.formsService.touchForm(form);
    } else if (!this.newPassword) {
      this.executeUpdate();
    } else if (this.newPasswordRepeated === this.newPassword) {
      this.executeUpdate();
    } else {
      this.alertService.error('Both new passwords should match');
    }
  }

  private executeUpdate(): void {
    if (this.update$) {
      this.update$.unsubscribe();
    }
    if (
      (this.oldPassword && !this.newPassword) ||
      (!this.oldPassword && this.newPassword)
    ) {
      this.alertService.error(
        'Both the new and the old password are required for a password update'
      );
    } else {
      const request: UpdateProfileRequest = !this.oldPassword
        ? { email: this.profile.email, passwords: null }
        : {
            email: this.profile.email,
            passwords: {
              oldPassword: this.oldPassword,
              newPassword: this.newPassword
            }
          };
      this.update$ = this.service.updateProfile(this.id, request).subscribe(
        user => (this.profile = user),
        (error: ErrorResponse) => this.alertService.error(error.code),
        () => {
          this.alertService.success('Profile updated');
          this.oldPassword = null;
          this.newPassword = null;
          this.newPasswordRepeated = null;
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.profile$) {
      this.profile$.unsubscribe();
    }
    if (this.update$) {
      this.update$.unsubscribe();
    }
  }
}
