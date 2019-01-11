import { Injectable } from '@angular/core';
import * as alertify from 'alertify.js';

@Injectable()
export class AlertService {
  constructor() {
    alertify.logPosition('bottom right');
  }

  public error(message: string) {
    alertify.error(message);
  }

  public success(message: string) {
    alertify.success(message);
  }
}
