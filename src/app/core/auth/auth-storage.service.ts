import { Injectable } from '@angular/core';
import { Role } from '../roles';

@Injectable()
export class AuthStorageService {
  public static readonly ID_KEY = 'id';
  public static readonly ROLE_KEY = 'role';
  public static readonly SESSION_ID_KEY = 'token';

  constructor() {}

  public setSessionId(sessionId: string, id: string, role: Role) {
    localStorage.setItem(AuthStorageService.ID_KEY, id);
    localStorage.setItem(AuthStorageService.SESSION_ID_KEY, sessionId);
    localStorage.setItem(AuthStorageService.ROLE_KEY, role);
  }

  public clearUserData() {
    localStorage.removeItem(AuthStorageService.SESSION_ID_KEY);
    localStorage.removeItem(AuthStorageService.ROLE_KEY);
    localStorage.removeItem(AuthStorageService.ID_KEY);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(AuthStorageService.SESSION_ID_KEY) && true;
  }

  public isLibrarian(): boolean {
    const role = localStorage.getItem(AuthStorageService.ROLE_KEY);
    return role === Role.LIBRARIAN;
  }

  public isUser(): boolean {
    const role = localStorage.getItem(AuthStorageService.ROLE_KEY);
    return role === Role.USER;
  }

  public getSessionId(): string {
    return localStorage.getItem(AuthStorageService.SESSION_ID_KEY);
  }

  public getUserId(): string {
    return localStorage.getItem(AuthStorageService.ID_KEY);
  }
}
