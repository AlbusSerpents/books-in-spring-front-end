import { Component, OnInit, Input } from '@angular/core';
import { Router, Params } from '@angular/router';
import { BookInfo, newBookInfo } from '../models/book-listing.interfaces';
import { newBookDetails } from '../models/book-details.interfaces';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent {
  @Input()
  book: BookInfo = newBookInfo();

  constructor(private router: Router) {}

  goToDetails() {
    const id = this.book.id;
    this.router.navigate(['public', 'book', 'details'], {
      queryParams: { id: this.book.id }
    });
  }
}
