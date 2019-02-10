import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicBooksService } from '../services/public-books.service';
import {
  BookInfo,
  BookSearch,
  newBookSearch
} from '../models/books.interfaces';
import { ActivatedRoute, ParamMap, PRIMARY_OUTLET } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-books-listing',
  templateUrl: './books-listing.component.html',
  styleUrls: ['./books-listing.component.css']
})
export class BooksListingComponent implements OnInit, OnDestroy {
  books: BookInfo[] = [];
  search: BookSearch = newBookSearch();

  private initial$: Subscription;
  private search$: Subscription;

  constructor(
    private service: PublicBooksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initial$ = this.route.paramMap
      .pipe(
        map(paramsMap => this.buildSearch(paramsMap)),
        tap(search => (this.search = search)),
        switchMap(search => this.service.findNewest())
      )
      .subscribe(books => (this.books = books));
  }

  private buildSearch(paramsMap: ParamMap): BookSearch {
    const year = paramsMap.get('year');
    return {
      name: paramsMap.get('name'),
      author: paramsMap.get('author'),
      publishingYear: year ? Number(year) : null
    };
  }

  submitSearch(): void {
    this.search$ = this.executeSearch(this.search).subscribe(
      books => (this.books = books)
    );
  }

  private executeSearch(search: BookSearch): Observable<BookInfo[]> {
    return !search.name && !search.author && !search.publishingYear
      ? this.service.findNewest()
      : this.service.findBooks(search);
  }

  ngOnDestroy() {
    if (this.initial$) {
      this.initial$.unsubscribe();
    }
    if (this.search$) {
      this.search$.unsubscribe();
    }
  }
}
