import { Club } from './clubs.interfaces';

export function isOwner(club: Club, userId: string): boolean {
  return club.owner && userId && club.owner.id === userId;
}

export function isMember(club: Club, userId: string): boolean {
  return (
    club.members &&
    club.members.filter(member => member.id === userId).length > 0
  );
}
