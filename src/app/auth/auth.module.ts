import { NgModule, RenderComponentType } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';
import { AuthService } from './services/auth.service';
import { RegistrationComponent } from './registration/registration.component';
import { LibrariansLoginComponent } from './librarians-login/librarians-login.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    LibrariansLoginComponent
  ],
  imports: [CommonModule, CoreModule, FormsModule],
  providers: [AuthService],
  exports: [LoginComponent, LibrariansLoginComponent, RegistrationComponent]
})
export class AuthModule {}
