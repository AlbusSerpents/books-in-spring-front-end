import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookInfoComponent } from './book-info/book-info.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [BookInfoComponent],
  imports: [CommonModule, CoreModule],
  exports: []
})
export class BooksModule {}
