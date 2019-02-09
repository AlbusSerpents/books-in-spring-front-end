import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  touchForm(form: NgForm): void {
    Object.keys(form.controls).forEach(key =>
      form.controls[key].markAsTouched()
    );
  }
}
