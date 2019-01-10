import { Injectable } from '@angular/core';
import { ConnectorService } from '../../core/http/connector.service';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import {
  LoginRequest,
  LoginResponse,
  User
} from '../interfaces/login.interface';

import { Role } from '../../core/roles';

@Injectable()
export class HomeService {
  constructor(
    private connector: ConnectorService,
    private authService: AuthStorageService
  ) {}

  public login(request: LoginRequest): Promise<User> {
    return this.connector
      .publicPost<LoginRequest, LoginResponse>('users/login', request)
      .then(response => {
        this.authService.setSessionId(
          response.sessionId,
          response.user.id,
          Role.USER
        );
        return response.user;
      });
  }

  public getProfile(userId: string): Promise<User> {
    return this.connector.get(`users/profile/${userId}`);
  }

  public logout(): Promise<void> {
    return this.connector.delete(`users/logout`).then(any => {
      this.authService.clearUserData();
    });
  }
}
