import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStorageService } from '../auth/auth-storage.service';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(
    private authStorage: AuthStorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authStorage.isLoggedIn() && this.authStorage.isUser()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
