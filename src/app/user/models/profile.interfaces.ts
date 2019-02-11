export interface Profile {
  id: string;
  name: string;
  email: string;
  wishlist: BookWish[];
}

export interface BookWish {
  name: string;
  author: string;
  publishingYear: number;
}

export interface UpdateProfileRequest {
  email: string;
  passwords: ChangePasswordRequest;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export function newProfile(): Profile {
  return {
    id: null,
    name: null,
    email: null,
    wishlist: []
  };
}
