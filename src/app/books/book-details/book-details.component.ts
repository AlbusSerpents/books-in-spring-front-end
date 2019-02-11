import { OnInit, OnDestroy, Component } from '@angular/core';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { PublicBooksService } from '../services/public-books.service';
import { UsersBooksService } from '../services/users-books.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  BookDetails,
  newBookDetails,
  Marker,
  Comment,
  RatingRequest,
  CommentRequest
} from '../models/book-details.interfaces';
import { switchMap, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AlertService } from '../../core/alerts/alert.service';
import { ErrorResponse } from '../../core/http/error.response';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  bookId: string;

  canModify = false;

  book: BookDetails = newBookDetails();
  contents: Marker[] = [];

  userComment: string = null;

  userRating: number = null;
  hasRated = false;

  private book$: Subscription;
  private comments$: Subscription;
  private rating$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authService: AuthStorageService,
    private detailsService: PublicBooksService,
    private modificationService: UsersBooksService
  ) {}

  ngOnInit() {
    this.canModify = this.authService.isLoggedIn() && this.authService.isUser();

    this.book$ = this.route.queryParamMap
      .pipe(
        map((paramsMap: ParamMap) => paramsMap.get('id')),
        tap((bookId: string) => (this.bookId = bookId)),
        switchMap((bookId: string) => this.detailsService.findDetails(bookId)),
        tap((book: BookDetails) => (this.book = book)),
        map((book: BookDetails) => book.id),
        switchMap((bookId: string) =>
          this.detailsService.findContentsForBook(bookId)
        )
      )
      .subscribe(
        (contents: Marker[]) => (this.contents = contents),
        error => this.router.navigate(['public'])
      );
  }

  ngOnDestroy() {
    if (this.book$) {
      this.book$.unsubscribe();
    }
    if (this.comments$) {
      this.comments$.unsubscribe();
    }
    if (this.rating$) {
      this.rating$.unsubscribe();
    }
  }

  showBookRating(): boolean {
    return this.book.rating && !this.hasRated;
  }

  showNaRating(): boolean {
    return this.userRating === null && this.book.rating === null;
  }

  canRate(): boolean {
    return this.canModify && !this.hasRated;
  }

  rate(): void {
    if (!this.canModify) {
      this.noAccessMessage();
    } else if (this.hasRated) {
      this.alertService.error('You have already rated this book');
    } else if (this.userRating === null) {
      this.alertService.error('You need to enter rating before submitting');
    } else {
      const request: RatingRequest = { rating: this.userRating };
      this.rating$ = this.modificationService
        .rate(this.bookId, request)
        .subscribe(
          _ => {
            this.hasRated = true;
            this.alertService.success('Rating recorded');
          },
          (error: ErrorResponse) => {
            this.alertService.error(error.code);
            this.hasRated = false;
          }
        );
    }
  }

  private noAccessMessage(): void {
    this.alertService.error('You must be logged in to comment');
  }

  comment(): void {
    if (!this.canModify) {
      this.noAccessMessage();
    } else if (!this.userComment) {
      this.alertService.error(`The comment can't be empty`);
    } else {
      if (this.comments$) {
        this.comments$.unsubscribe();
      }
      const request: CommentRequest = { comment: this.userComment };
      this.comments$ = this.modificationService
        .comment(this.bookId, request)
        .subscribe(
          comments => (this.book.comments = comments),
          (error: ErrorResponse) => this.alertService.error(error.code),
          () => (this.userComment = null)
        );
    }
  }
}
