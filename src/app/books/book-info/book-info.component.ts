import { Component, OnInit, Input } from '@angular/core';
import { BookInfo } from '../models/books.interfaces';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent {
  @Input()
  public book: BookInfo = {
    id: '222a73d1-8741-4700-8702-d4f684bf7c38',
    name: 'Lord of the Rings',
    author: 'J.R.R. Tolkin',
    publishingYear: 1949,
    bookCover:
      'http://www.tolkienshop.com/contents/media/l_lotr-pb-blackrider2003.png'
  };

  constructor(private router: Router) {}

  goToDetails() {
    const id = this.book.id;
    this.router.navigate(['public', 'book', 'details'], {
      queryParams: { id: this.book.id }
    });
  }
}
