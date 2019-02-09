import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { CoreModule } from '../core/core.module';
import { HomeService } from './services/home.service';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    HomeScreenComponent,
    ProfileComponent,
    NavbarComponent,
    LogoutComponent
  ],
  imports: [CommonModule, CoreModule, RouterModule],
  providers: [HomeService],
  exports: [HomeScreenComponent]
})
export class HomeModule {}
