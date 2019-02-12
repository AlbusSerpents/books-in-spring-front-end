import { Injectable } from '@angular/core';
import { ConnectorService } from '../../core/http/connector.service';
import {
  ClubsSearch,
  ClubInfo,
  Club,
  CreateClubRequest,
  UpdateClubRequest
} from '../models/clubs.interfaces';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ClubsService {
  constructor(private connector: ConnectorService) {}

  getAllClubs({ name, topic }: ClubsSearch): Observable<ClubInfo[]> {
    let params: HttpParams = new HttpParams();
    params = this.name(name, params);
    params = this.topic(topic, params);

    const requestParams = params.toString();
    return this.connector.get<ClubInfo[]>(`common/clubs?${requestParams}`);
  }

  private name(name: string, params: HttpParams): HttpParams {
    return name ? params.append('name', name) : params;
  }

  private topic(topic: string, params: HttpParams): HttpParams {
    return topic ? params.append('topic', topic) : params;
  }

  getMyClubs(userId: string): Observable<ClubInfo[]> {
    return this.connector.get<ClubInfo[]>(`users/${userId}/my-clubs`);
  }

  getClubById(clubId: string): Observable<Club> {
    return this.connector.get<Club>(`common/clubs/${clubId}`);
  }

  create(request: CreateClubRequest): Observable<Club> {
    return this.connector.post<CreateClubRequest, Club>(`users/clubs`, request);
  }

  join(clubId: string): Observable<void> {
    return this.connector.post<void, void>(`users/clubs/${clubId}/join`, null);
  }

  leave(clubId: string): Observable<void> {
    return this.connector.post<void, void>(`users/clubs/${clubId}/leave`, null);
  }

  update(clubId: string, request: UpdateClubRequest): Observable<Club> {
    return this.connector.put<UpdateClubRequest, Club>(
      `users/clubs/${clubId}`,
      request
    );
  }

  userDelete(clubId: string): Observable<void> {
    return this.connector.delete<void>(`users/clubs/${clubId}`);
  }

  librariansDelete(clubId: string): Observable<void> {
    return this.connector.delete<void>(`librarians/clubs/${clubId}`);
  }
}
