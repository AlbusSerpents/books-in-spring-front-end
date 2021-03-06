import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AuthStorageService } from '../auth/auth-storage.service';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse, ErroCode } from './error.response';

@Injectable()
export class ConnectorService {
  private baseUrl = 'http://localhost:8080/v1';

  constructor(private http: HttpClient, private authData: AuthStorageService) {}

  public get<Response>(
    url: string,
    parameters?: HttpParams
  ): Observable<Response> {
    return this.http
      .get<Response>(`${this.baseUrl}/${url}`, this.options(parameters))
      .pipe(catchError(e => this.handleError<Response>(e)));
  }

  public publicGet<Response>(
    url: string,
    parameters?: HttpParams
  ): Observable<Response> {
    return this.http
      .get<Response>(`${this.baseUrl}/${url}`, this.publicOptions(parameters))
      .pipe(catchError(e => this.handleError<Response>(e)));
  }

  public post<Request, Response>(
    url: string,
    body: Request
  ): Observable<Response> {
    return this.http
      .post<Response>(`${this.baseUrl}/${url}`, body, this.options())
      .pipe(catchError(e => this.handleError<Response>(e)));
  }

  public publicPost<Request, Response>(
    url: string,
    body: Request
  ): Observable<Response> {
    return this.http
      .post<Response>(`${this.baseUrl}/${url}`, body, this.publicOptions())
      .pipe(catchError(e => this.handleError<Response>(e)));
  }

  public put<Request, Response>(
    url: string,
    body: Request
  ): Observable<Response> {
    return this.http
      .put<Response>(`${this.baseUrl}/${url}`, body, this.options())
      .pipe(catchError(e => this.handleError<Response>(e)));
  }

  public publicPut<Request, Response>(
    url: string,
    body: Request
  ): Observable<Response> {
    return this.http
      .put<Response>(`${this.baseUrl}/${url}`, body, this.publicOptions())
      .pipe(catchError(e => this.handleError<Response>(e)));
  }
  public delete<Response>(url: string): Observable<Response> {
    return this.http
      .delete<Response>(`${this.baseUrl}/${url}`, this.options())
      .pipe(catchError(e => this.handleError<Response>(e)));
  }

  public publicDelete<Response>(url: string): Observable<Response> {
    return this.http
      .delete<Response>(`${this.baseUrl}/${url}`, this.publicOptions())
      .pipe(catchError(e => this.handleError<Response>(e)));
  }

  private options(parameters?: HttpParams) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('X-Auth-Token', this.authData.getSessionId());
    return { headers, parameters };
  }

  private publicOptions(parameters?: HttpParams) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return { headers, parameters };
  }

  private handleError<A>(e): Observable<A> {
    console.log(e);
    const error: ErrorResponse = e.error;
    if (error.code === ErroCode.AUTHENTICATION_REQUIRED) {
      this.authData.clearUserData();
    }
    throw e.error;
  }
}
