import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

import { LoginRequest, User } from '../interfaces/login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent {
  constructor(private service: HomeService, private router: Router) {}

  public async login() {
    const loginRequest: LoginRequest = {
      email: 'abc@example.com',
      password: '1234'
    };

    await this.service
      .login(loginRequest)
      .then(any => this.router.navigateByUrl('/profile'));
  }
}
