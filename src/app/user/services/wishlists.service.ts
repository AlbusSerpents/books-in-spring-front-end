import { Injectable } from '@angular/core';
import { ConnectorService } from '../../core/http/connector.service';
import { BookWish } from '../models/profile.interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class WishlistsService {
  constructor(private connector: ConnectorService) {}

  getWishlist(userId: string): Observable<BookWish[]> {
    return this.connector.get<BookWish[]>(`users/profile/${userId}/wishlist`);
  }

  addToWishlish(userId: string, wish: BookWish): Observable<BookWish[]> {
    return this.connector.post<BookWish, BookWish[]>(
      `users/profile/${userId}/wishlist/add`,
      wish
    );
  }

  removeFromWishlist(userId: string, wish: BookWish): Observable<void> {
    return this.connector.post<BookWish, void>(
      `users/profile/${userId}/wishlist/remove`,
      wish
    );
  }
}
