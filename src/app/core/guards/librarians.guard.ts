import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStorageService } from '../auth/auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LibrariansGuard implements CanActivate {
  constructor(
    private authStorage: AuthStorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authStorage.isLoggedIn() && this.authStorage.isLibrarian()) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
