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
  RegistrationRequest,
  LibrariansLoginRequest,
  LibrarinaAuthenticationResponse,
  Librarian
} from '../models/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private connector: ConnectorService,
    private authService: AuthStorageService
  ) {}

  login(request: LoginRequest): Observable<User> {
    return this.connector
      .publicPost<LoginRequest, AuthenticationResponse>('users/login', request)
      .pipe(
        map(({ sessionId, user }) => {
          this.authService.setSessionId(sessionId, user.id, Role.USER);
          return user;
        })
      );
  }

  librariansLogin(request: LibrariansLoginRequest): Observable<Librarian> {
    return this.connector
      .publicPost<LibrariansLoginRequest, LibrarinaAuthenticationResponse>(
        'librarians/login',
        request
      )
      .pipe(
        map(({ sessionId, librarian }) => {
          this.authService.setSessionId(
            sessionId,
            librarian.id,
            Role.LIBRARIAN
          );
          return librarian;
        })
      );
  }

  register(request: RegistrationRequest): Observable<User> {
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
