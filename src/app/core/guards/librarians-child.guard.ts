import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStorageService } from '../auth/auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LibrariansChildGuard implements CanActivateChild {
  constructor(
    private authStorage: AuthStorageService,
    private router: Router
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('here');
    if (this.authStorage.isLoggedIn() && this.authStorage.isLibrarian()) {
      return true;
    } else {
      this.router.navigate(['public']);
      return false;
    }
  }
}
