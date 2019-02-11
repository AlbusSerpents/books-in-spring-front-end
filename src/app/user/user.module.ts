import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { CoreModule } from '../core/core.module';
import { ProfileService } from './services/profile.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, CoreModule, FormsModule],
  providers: [ProfileService],
  exports: [ProfileComponent]
})
export class UserModule {}
