export interface BookDetails {
  id: string;
  name: string;
  author: string;
  publishingYear: number;
  description: string;
  bookCover: string;
  rating: number;
  comments: Comment[];
}

export interface Comment {
  commenterId: string;
  commenter: string;
  comment: string;
}

export interface Marker {
  name: string;
  page: number;
}

export interface RatingRequest {
  rating: number;
}

export interface CommentRequest {
  comment: string;
}

export function newBookDetails(): BookDetails {
  return {
    id: null,
    name: null,
    author: null,
    publishingYear: null,
    description: null,
    bookCover: null,
    rating: null,
    comments: []
  };
}

export function newContents(): Marker[] {
  return [];
}

export function newCommentRequest(): CommentRequest {
  return { comment: null };
}

export function newRatingRequest(): RatingRequest {
  return { rating: null };
}
