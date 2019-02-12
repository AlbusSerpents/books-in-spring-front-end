import { Component, OnDestroy } from '@angular/core';
import { ClubsService } from '../service/clubs.service';
import {
  CreateClubRequest,
  newCreateClubRequest
} from '../models/clubs.interfaces';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormService } from '../../core/forms/forms.service';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../core/alerts/alert.service';
import { ErrorResponse } from '../../core/http/error.response';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css']
})
export class AddClubComponent implements OnDestroy {
  club: CreateClubRequest = newCreateClubRequest();

  private create$: Subscription;

  constructor(
    private router: Router,
    private service: ClubsService,
    private formsService: FormService,
    private alertService: AlertService
  ) {}

  submit(form: NgForm): void {
    if (!form.valid) {
      this.formsService.touchForm(form);
    } else {
      this.create$ = this.service.create(this.club).subscribe(
        success => {},
        (error: ErrorResponse) => this.alertService.error(error.code),
        () => {
          this.alertService.success(`Club ${this.club.name} created`);
          this.router.navigate(['user', 'clubs', 'all']);
        }
      );
    }
  }

  back(): void {
    this.router.navigate(['user', 'clubs', 'all']);
  }

  ngOnDestroy() {
    if (this.create$) {
      this.create$.unsubscribe();
    }
  }
}
