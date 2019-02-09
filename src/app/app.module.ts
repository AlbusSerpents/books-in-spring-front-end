import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { routing } from './app-routing';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HomeModule, AuthModule, routing],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
