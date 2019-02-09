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
import { AlertService } from './alerts/alert.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    ConnectorService,
    AuthStorageService,
    UsersGuard,
    UsersChildGuard,
    LibrariansGuard,
    LibrariansChildGuard,
    AlertService
  ]
})
export class CoreModule {}
