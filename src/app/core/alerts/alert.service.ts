import { Injectable } from '@angular/core';
import * as alertify from 'alertify.js';

@Injectable()
export class AlertService {
  constructor() {
    alertify.logPosition('bottom right');
  }

  public error(message: string): void {
    alertify.error(message);
  }

  public success(message: string): void {
    alertify.success(message);
  }
}
