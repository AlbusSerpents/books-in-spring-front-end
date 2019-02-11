import { Injectable } from '@angular/core';
import { ConnectorService } from '../../core/http/connector.service';
import { BookInfo, BookSearch } from '../models/book-listing.interfaces';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ERROR_COLLECTOR_TOKEN } from '@angular/platform-browser-dynamic/src/compiler_factory';

@Injectable()
export class PublicBooksService {
  constructor(private connector: ConnectorService) {}

  findBooks({
    name,
    author,
    publishingYear
  }: BookSearch): Observable<BookInfo[]> {
    let params = new HttpParams();
    params = this.name(name, params);
    params = this.author(author, params);
    params = this.year(publishingYear, params);

    const requestParams = params.toString();
    return this.connector.publicGet<BookInfo[]>(`public/books?${params}`);
  }

  private name(name: string, params: HttpParams): HttpParams {
    return name ? params.set('name', name) : params;
  }

  private author(author: string, params: HttpParams): HttpParams {
    return author ? params.set('author', author) : params;
  }
  private year(year: number, params: HttpParams): HttpParams {
    return year ? params.set('publishingYear', String(year)) : params;
  }

  findNewest(): Observable<BookInfo[]> {
    return this.connector.publicGet<BookInfo[]>('public/books/newest');
  }
}
