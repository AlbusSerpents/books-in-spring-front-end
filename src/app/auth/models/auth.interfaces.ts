import { Role } from '../../core/roles';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthenticationResponse {
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

export function newRegistrationRequest(): RegistrationRequest {
  return {
    name: '',
    email: '',
    password: ''
  };
}
