import { Injectable } from '@angular/core';
import { ConnectorService } from '../../core/http/connector.service';
import {
  RatingRequest,
  CommentRequest,
  Comment
} from '../models/book-details.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersBooksService {
  constructor(private connector: ConnectorService) {}

  rate(bookId: string, request: RatingRequest): Observable<void> {
    return this.connector.post<RatingRequest, void>(
      `users/books/${bookId}/rate`,
      request
    );
  }

  comment(bookId: string, request: CommentRequest): Observable<Comment[]> {
    return this.connector.post<CommentRequest, Comment[]>(
      `users/books/${bookId}/comment`,
      request
    );
  }
}
