import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectorService } from './http/connector.service';
import { AuthStorageService } from './auth/auth-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, HttpClientModule, BrowserModule],
  providers: [ConnectorService, AuthStorageService]
})
export class CoreModule {}
