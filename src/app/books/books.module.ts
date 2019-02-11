import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookInfoComponent } from './book-info/book-info.component';
import { CoreModule } from '../core/core.module';
import { BooksListingComponent } from './books-listing/books-listing.component';
import { PublicBooksService } from './services/public-books.service';
import { FormsModule } from '@angular/forms';
import { UsersBooksService } from './services/users-books.service';

@NgModule({
  declarations: [BookInfoComponent, BooksListingComponent],
  imports: [CommonModule, CoreModule, FormsModule],
  providers: [PublicBooksService, UsersBooksService],
  exports: [BooksListingComponent]
})
export class BooksModule {}
