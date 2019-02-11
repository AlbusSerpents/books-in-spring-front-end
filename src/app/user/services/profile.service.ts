import { Injectable } from '@angular/core';
import { ConnectorService } from '../../core/http/connector.service';
import { Observable } from 'rxjs';
import { UpdateProfileRequest, Profile } from '../models/profile.interfaces';
import { User } from '../../auth/models/auth.interfaces';

@Injectable()
export class ProfileService {
  constructor(private connector: ConnectorService) {}

  getProfile(userId: string): Observable<Profile> {
    return this.connector.get<Profile>(`users/profile/${userId}`);
  }

  updateProfile(
    userId: string,
    request: UpdateProfileRequest
  ): Observable<Profile> {
    return this.connector.put(`users/profile/${userId}`, request);
  }
}
