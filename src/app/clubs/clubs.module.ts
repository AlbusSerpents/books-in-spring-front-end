import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsListingComponent } from './clubs-listing/clubs-listing.component';
import { CoreModule } from '../core/core.module';
import { ClubsService } from './service/clubs.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClubsListingComponent],
  imports: [CommonModule, CoreModule, FormsModule],
  providers: [ClubsService],
  exports: [ClubsListingComponent]
})
export class ClubsModule {}
