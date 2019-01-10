import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { CoreModule } from '../core/core.module';
import { HomeService } from './services/home.service';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeScreenComponent, ProfileComponent],
  imports: [CommonModule, CoreModule, RouterModule],
  providers: [HomeService],
  exports: [HomeScreenComponent]
})
export class HomeModule {}
