import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsListingComponent } from './clubs-listing/clubs-listing.component';
import { CoreModule } from '../core/core.module';
import { ClubsService } from './service/clubs.service';
import { FormsModule } from '@angular/forms';
import { AddClubComponent } from './add-club/add-club.component';

@NgModule({
  declarations: [ClubsListingComponent, AddClubComponent],
  imports: [CommonModule, CoreModule, FormsModule],
  providers: [ClubsService],
  exports: [ClubsListingComponent, AddClubComponent]
})
export class ClubsModule {}
