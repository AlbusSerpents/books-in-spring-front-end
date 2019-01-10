import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { User } from '../interfaces/login.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(
    private service: HomeService,
    private authService: AuthStorageService
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  private async loadProfile() {
    const userId = this.authService.getUserId();
    this.user = await this.service.getProfile(userId);
  }

  public async logout() {
    await this.service.logout();
  }
}
