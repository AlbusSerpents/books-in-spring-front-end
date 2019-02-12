import { Role } from '../../core/roles';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LibrariansLoginRequest {
  username: string;
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

export interface LibrarinaAuthenticationResponse {
  sessionId: string;
  librarian: Librarian;
  roles: [Role];
}

export interface Librarian {
  id: string;
  name: string;
  username: string;
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

export function newLibrariansLoginRequest(): LibrariansLoginRequest {
  return {
    username: '',
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
