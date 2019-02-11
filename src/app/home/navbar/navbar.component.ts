import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../interfaces/nav-bar.interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input()
  public navbar: Navbar;

  constructor(private router: Router) {}

  public redirect(url: string[]): void {
    this.router.navigate(url);
  }

  public navigateHome(): void {
    this.router.navigate(['public']);
  }
}
