import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ErrorResponse, ErroCode } from '../../core/http/error.response';
import { asElementData } from '@angular/core/src/view';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {
  private sub$: Subscription;

  constructor(
    private router: Router,
    private authService: AuthStorageService,
    private service: HomeService
  ) {}

  ngOnInit() {
    if (this.authService.isUser()) {
      this.sub$ = this.service.logout().subscribe(
        _ => this.router.navigate(['public']),
        error => this.handleError,
        () => {
          this.router.navigate(['public']);
        }
      );
    } else if (this.authService.isLibrarian()) {
      this.sub$ = this.service.logoutLibrarinat().subscribe(
        _ => this.router.navigate(['public']),
        error => this.handleError,
        () => {
          this.router.navigate(['public']);
        }
      );
    } else {
      this.router.navigate(['public']);
    }
  }

  private handleError(error: ErrorResponse): void {
    const code = error.code;
    if (error.code === ErroCode.AUTHENTICATION_REQUIRED) {
      this.router.navigate(['public']);
    }
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
