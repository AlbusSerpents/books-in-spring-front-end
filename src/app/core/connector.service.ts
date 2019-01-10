import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthStorageService } from './auth-storage.service';

@Injectable()
export class ConnectorService {
  private baseUrl = 'http://localhost:8080/v1';

  constructor(private http: HttpClient, private authData: AuthStorageService) {}

  public get<Request>(url: string): Promise<Request> {
    return this.http
      .get<Request>(`${this.baseUrl}/${url}`, this.headers())
      .toPromise();
  }

  public publicGet<Request>(url: string): Promise<Request> {
    return this.http
      .get<Request>(`${this.baseUrl}/${url}`, this.publicHeaders())
      .toPromise();
  }

  public post<Request, Response>(
    url: string,
    body: Request
  ): Promise<Response> {
    return this.http
      .post<Response>(`${this.baseUrl}/${url}`, body, this.headers())
      .toPromise();
  }

  public publicPost<Request, Response>(
    url: string,
    body: Request
  ): Promise<Response> {
    return this.http
      .post<Response>(`${this.baseUrl}/${url}`, body, this.publicHeaders())
      .toPromise();
  }

  public put<Request, Response>(url: string, body: Request): Promise<Response> {
    return this.http
      .put<Response>(`${this.baseUrl}/${url}`, body, this.headers())
      .toPromise();
  }

  public publicPut<Request, Response>(
    url: string,
    body: Request
  ): Promise<Response> {
    return this.http
      .put<Response>(`${this.baseUrl}/${url}`, body, this.publicHeaders())
      .toPromise();
  }
  public delete<Request>(url: string): Promise<Request> {
    return this.http
      .delete<Request>(`${this.baseUrl}/${url}`, this.headers())
      .toPromise();
  }

  public publicDelete<Request>(url: string): Promise<Request> {
    return this.http
      .delete<Request>(`${this.baseUrl}/${url}`, this.publicHeaders())
      .toPromise();
  }

  private headers() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('X-Auth-Token', this.authData.getSessionId());
    return { headers };
  }

  private publicHeaders() {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return { headers };
  }
}
