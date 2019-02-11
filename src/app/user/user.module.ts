import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { CoreModule } from '../core/core.module';
import { ProfileService } from './services/profile.service';
import { FormsModule } from '@angular/forms';
import { WishlishComponent } from './wishlish/wishlish.component';
import { WishlistsService } from './services/wishlists.service';

@NgModule({
  declarations: [ProfileComponent, WishlishComponent],
  imports: [CommonModule, CoreModule, FormsModule],
  providers: [ProfileService, WishlistsService],
  exports: [ProfileComponent]
})
export class UserModule {}
