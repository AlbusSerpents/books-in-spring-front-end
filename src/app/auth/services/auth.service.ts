import { Injectable } from '@angular/core';
import { ConnectorService } from '../../core/http/connector.service';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { Observable } from 'rxjs';
import {
  User,
  LoginRequest,
  LoginResponse
} from '../interfaces/auth.interfaces';
import { map } from 'rxjs/operators';
import { Role } from '../../core/roles';

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
}
