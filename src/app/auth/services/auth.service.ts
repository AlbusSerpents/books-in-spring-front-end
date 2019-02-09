import { Injectable } from '@angular/core';
import { ConnectorService } from '../../core/http/connector.service';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../../core/roles';
import {
  LoginRequest,
  User,
  AuthenticationResponse,
  RegistrationRequest
} from '../models/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private connector: ConnectorService,
    private authService: AuthStorageService
  ) {}

  public login(request: LoginRequest): Observable<User> {
    return this.connector
      .publicPost<LoginRequest, AuthenticationResponse>('users/login', request)
      .pipe(
        map(({ sessionId, user }) => {
          this.authService.setSessionId(sessionId, user.id, Role.USER);
          return user;
        })
      );
  }

  public register(request: RegistrationRequest): Observable<User> {
    return this.connector
      .publicPost<RegistrationRequest, AuthenticationResponse>(
        'users/register',
        request
      )
      .pipe(
        map(({ sessionId, user }) => {
          this.authService.setSessionId(sessionId, user.id, Role.USER);
          return user;
        })
      );
  }
}
