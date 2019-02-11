import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BookWish, newBookWish } from '../models/profile.interfaces';
import { WishlistsService } from '../services/wishlists.service';
import { AlertService } from '../../core/alerts/alert.service';
import { ErrorResponse } from '../../core/http/error.response';
import { NgForm, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-wishlish',
  templateUrl: './wishlish.component.html',
  styleUrls: ['./wishlish.component.css']
})
export class WishlishComponent implements OnDestroy {
  @Input()
  userId: string;

  @Input()
  wishlist: BookWish[];

  newWish: BookWish = newBookWish();

  private remove$: Subscription;
  private add$: Subscription;

  constructor(
    private service: WishlistsService,
    private alertService: AlertService
  ) {}

  removeWish(index: number): void {
    const toDelete = this.wishlist[index];
    console.log(toDelete);
    if (this.remove$) {
      this.remove$.unsubscribe();
    }
    this.remove$ = this.service
      .removeFromWishlist(this.userId, toDelete)
      .subscribe(
        _ => this.wishlist.splice(index, 1),
        (error: ErrorResponse) => this.alertService.error(error.code)
      );
  }

  addWish(): void {
    if (!this.validateNewWish()) {
      this.alertService.error('Title, Author and Publishing year are required');
    } else {
      if (this.add$) {
        this.add$.unsubscribe();
      }
      this.add$ = this.service
        .addToWishlish(this.userId, this.newWish)
        .subscribe(
          newWishes => {
            this.wishlist = newWishes;
            this.newWish = newBookWish();
          },
          (error: ErrorResponse) => this.alertService.error(error.code)
        );
    }
  }

  validateNewWish(): boolean {
    return (
      this.newWish.name !== null &&
      this.newWish.name !== '' &&
      this.newWish.author !== null &&
      this.newWish.author !== '' &&
      this.newWish.publishingYear !== null
    );
  }

  ngOnDestroy() {
    if (this.remove$) {
      this.remove$.unsubscribe();
    }
    if (this.add$) {
      this.add$.unsubscribe();
    }
  }
}
