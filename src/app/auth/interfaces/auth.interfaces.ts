import { Role } from '../../core/roles';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  sessionId: string;
  user: User;
  roles: [Role];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export function newLoginRequest(): LoginRequest {
  return {
    email: '',
    password: ''
  };
}
