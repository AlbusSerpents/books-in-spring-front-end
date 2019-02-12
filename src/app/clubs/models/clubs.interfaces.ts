import { ClubsService } from '../service/clubs.service';

export interface ClubInfo {
  id: string;
  name: string;
  topic: string;
  description: string;
}

export interface Club {
  id: string;
  name: string;
  topic: string;
  description: string;
  owner: MemberInfo;
  members: MemberInfo[];
}

export interface MemberInfo {
  id: string;
  name: string;
}

export interface UpdateClubRequest {
  description: string;
}

export interface CreateClubRequest {
  name: string;
  topic: string;
  description: string;
}

export interface ClubsSearch {
  name: string;
  topic: string;
}

export function newClubSearch(): ClubsSearch {
  return {
    name: null,
    topic: null
  };
}

export function newClub(): Club {
  return {
    id: null,
    name: null,
    topic: null,
    description: null,
    owner: null,
    members: []
  };
}
