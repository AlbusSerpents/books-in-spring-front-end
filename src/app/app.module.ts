import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { routing } from './app-routing';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HomeModule, AuthModule, BooksModule, routing],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
