import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectorService } from './http/connector.service';
import { AuthStorageService } from './auth/auth-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UsersGuard } from './guards/users.guard';
import { UsersChildGuard } from './guards/users-child.guard';
import { LibrariansGuard } from './guards/librarians.guard';
import { LibrariansChildGuard } from './guards/librarians-child.guard';

@NgModule({
  imports: [CommonModule, HttpClientModule, BrowserModule, RouterModule],
  providers: [
    ConnectorService,
    AuthStorageService,
    UsersGuard,
    UsersChildGuard,
    LibrariansGuard,
    LibrariansChildGuard
  ]
})
export class CoreModule {}
