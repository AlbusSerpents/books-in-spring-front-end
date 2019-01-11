import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectorService } from './http/connector.service';
import { AuthStorageService } from './auth/auth-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UsersGuard } from './guards/users.guard';
import { UsersChildGuard } from './guards/users-child.guard';

@NgModule({
  imports: [CommonModule, HttpClientModule, BrowserModule, RouterModule],
  providers: [ConnectorService, AuthStorageService, UsersGuard, UsersChildGuard]
})
export class CoreModule {}
