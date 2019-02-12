import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Club,
  newClub,
  UpdateClubRequest,
  MemberInfo
} from '../models/clubs.interfaces';
import { Subscription } from 'rxjs';
import { AuthStorageService } from '../../core/auth/auth-storage.service';
import { AlertService } from '../../core/alerts/alert.service';
import { ClubsService } from '../service/clubs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ErrorResponse } from '../../core/http/error.response';
import { isOwner, isMember } from '../models/clubs.access';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css']
})
export class ClubDetailsComponent implements OnInit, OnDestroy {
  canDelete = false;
  canEdit = false;
  canJoin = false;
  canLeave = false;

  private userId: string;

  club: Club = newClub();

  private club$: Subscription;
  private join$: Subscription;
  private leave$: Subscription;
  private delete$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ClubsService,
    authService: AuthStorageService,
    private alertService: AlertService
  ) {
    this.userId = authService.isUser() ? authService.getUserId() : null;
  }

  ngOnInit() {
    this.loadClub();
  }

  private loadClub() {
    this.club$ = this.route.queryParamMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.service.getClubById(id))
      )
      .subscribe(
        club => {
          this.club = club;
          const hasOnwership = isOwner(club, this.userId);
          const hasMembership = isMember(club, this.userId);
          this.canDelete = !this.userId || hasOnwership;
          this.canEdit = this.userId && hasOnwership;
          this.canJoin = this.userId && !hasMembership;
          this.canLeave = this.userId && hasMembership && !hasOnwership;
        },
        (error: ErrorResponse) => {
          this.alertService.error(error.code);
          this.router.navigate(['user', 'clubs', 'all']);
        }
      );
  }

  back() {
    this.router.navigate(['user', 'clubs', 'all']);
  }

  leave(): void {
    if (!this.canLeave) {
      return;
    } else {
      if (this.leave$) {
        this.leave$.unsubscribe();
      }
      this.leave$ = this.service
        .leave(this.club.id)
        .subscribe(
          () => this.router.navigate(['user', 'clubs', 'all']),
          (error: ErrorResponse) => this.alertService.error(error.code)
        );
    }
  }

  join(): void {
    if (!this.canJoin) {
      return;
    } else {
      if (this.join$) {
        this.join$.unsubscribe();
      }
      this.join$ = this.service
        .join(this.club.id)
        .subscribe(
          () => {},
          (error: ErrorResponse) => this.alertService.error(error.code),
          () => this.loadClub()
        );
    }
  }

  edit(): void {
    if (!this.canEdit) {
      return;
    } else if (!this.club.description) {
      this.alertService.error('Description is required for update');
      return;
    }
    const request: UpdateClubRequest = {
      description: this.club.description
    };
    if (this.club$) {
      this.club$.unsubscribe();
    }
    this.club$ = this.service.update(this.club.id, request).subscribe(
      club => {
        this.club = club;
        this.alertService.success('Descripton updated');
      },
      (error: ErrorResponse) => {
        this.alertService.error(error.code);
        this.router.navigate(['user', 'clubs', 'all']);
      }
    );
  }

  delete(): void {
    if (!this.canDelete) {
      return;
    }
    if (this.delete$) {
      this.delete$.unsubscribe();
    }

    if (this.userId) {
      this.delete$ = this.service.userDelete(this.club.id).subscribe(
        () => {},
        (error: ErrorResponse) => {
          this.alertService.error(error.code);
          this.router.navigate(['user', 'clubs', 'all']);
        },
        () => this.router.navigate(['user', 'clubs', 'all'])
      );
    } else {
      this.delete$ = this.service.librariansDelete(this.club.id).subscribe(
        () => {},
        (error: ErrorResponse) => {
          this.alertService.error(error.code);
          this.router.navigate(['user', 'clubs', 'all']);
        },
        () => this.router.navigate(['user', 'clubs', 'all'])
      );
    }
  }

  ngOnDestroy() {
    if (this.club$) {
      this.club$.unsubscribe();
    }
    if (this.join$) {
      this.join$.unsubscribe();
    }
    if (this.leave$) {
      this.leave$.unsubscribe();
    }
    if (this.delete$) {
      this.delete$.unsubscribe();
    }
  }
}
