import { Injectable } from '@angular/core';
import { ConnectorService } from '../../core/http/connector.service';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import {
  LoginRequest,
  LoginResponse,
  User
} from '../interfaces/login.interface';

import { Role } from '../../core/roles';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeService {
  constructor(
    private connector: ConnectorService,
    private authService: AuthStorageService
  ) {}

  public login(request: LoginRequest): Observable<User> {
    return this.connector
      .publicPost<LoginRequest, LoginResponse>('users/login', request)
      .pipe(
        map(response => {
          this.authService.setSessionId(
            response.sessionId,
            response.user.id,
            Role.USER
          );
          return response.user;
        })
      );
  }

  public logout(): Observable<void> {
    return this.connector.delete(`users/logout`).pipe(
      map(any => {
        this.authService.clearUserData();
      })
    );
  }
}
