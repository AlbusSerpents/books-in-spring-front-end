import { Injectable } from '@angular/core';
import { ConnectorService } from '../../core/http/connector.service';
import { AuthStorageService } from '../../core/auth/auth-storage.service';

import { Role } from '../../core/roles';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeService {
  constructor(
    private connector: ConnectorService,
    private authService: AuthStorageService
  ) {}

  logout(): Observable<void> {
    return this.connector.delete(`users/logout`).pipe(
      map(any => {
        this.authService.clearUserData();
      })
    );
  }

  logoutLibrarinat(): Observable<void> {
    return this.connector.delete(`librarians/logout`).pipe(
      map(any => {
        this.authService.clearUserData();
      })
    );
  }
}
