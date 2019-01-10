import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { routing } from './app-routing';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HomeModule, routing],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
