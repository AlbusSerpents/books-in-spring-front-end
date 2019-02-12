import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { serializePath } from '@angular/router/src/url_tree';
import {
  ClubInfo,
  ClubsSearch,
  newClubSearch
} from '../models/clubs.interfaces';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { ClubsService } from '../service/clubs.service';
import { Router } from '@angular/router';
import { ErrorResponse } from '../../core/http/error.response';
import { AlertService } from '../../core/alerts/alert.service';

@Component({
  selector: 'app-clubs-listing',
  templateUrl: './clubs-listing.component.html',
  styleUrls: ['./clubs-listing.component.css']
})
export class ClubsListingComponent implements OnInit, OnDestroy {
  disableSearch = false;
  isUser = false;
  clubs: ClubInfo[] = [];
  search: ClubsSearch = newClubSearch();

  private userId: string;

  private search$: Subscription;
  private join$: Subscription;
  private leave$: Subscription;

  constructor(
    private altertService: AlertService,
    authService: AuthStorageService,
    private service: ClubsService,
    private router: Router
  ) {
    this.isUser = authService.isUser();
    if (this.isUser) {
      this.userId = authService.getUserId();
    }
  }

  ngOnInit() {
    if (this.isUser) {
      this.searchMyClubs();
    } else {
      this.searchAll();
    }
  }

  addClub(): void {
    this.router.navigate(['user', 'clubs', 'add']);
  }

  details(clubId: string) {
    if (this.isUser) {
      this.router.navigate(['user', 'clubs', 'details'], {
        queryParams: { id: clubId }
      });
    } else {
      this.router.navigate(['librarian', 'clubs', 'details'], {
        queryParams: { id: clubId }
      });
    }
  }

  extraSearch(): void {
    if (this.search$) {
      this.search$.unsubscribe();
    }
    if (this.disableSearch) {
      this.searchAll();
    } else {
      this.searchMyClubs();
    }
  }

  private searchMyClubs(): void {
    this.search$ = this.service.getMyClubs(this.userId).subscribe(
      clubs => (this.clubs = clubs),
      (error: ErrorResponse) => this.altertService.error(error.code),
      () => {
        this.search = newClubSearch();
        this.disableSearch = true;
      }
    );
  }

  searchAll(): void {
    this.search$ = this.service
      .getAllClubs(this.search)
      .subscribe(
        clubs => (this.clubs = clubs),
        (error: ErrorResponse) => this.altertService.error(error.code),
        () => (this.disableSearch = false)
      );
  }

  extraSearchButtonValue(): string {
    return this.disableSearch ? 'Show All Clubs' : 'Show My Clubs';
  }

  showSplitter(index: number): boolean {
    console.log(index);
    console.log(index < this.clubs.length - 1);
    return index < this.clubs.length - 1;
  }

  ngOnDestroy() {
    if (this.search$) {
      this.search$.unsubscribe();
    }
    if (this.join$) {
      this.join$.unsubscribe();
    }
    if (this.leave$) {
      this.leave$.unsubscribe();
    }
  }
}
