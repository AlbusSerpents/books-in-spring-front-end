export interface BookInfo {
  id: string;
  name: string;
  author: string;
  publishingYear: number;
  bookCover: string;
}

export interface BookSearch {
  name: string;
  author: string;
  publishingYear: number;
}

export function newBookSearch(): BookSearch {
  return {
    name: null,
    author: null,
    publishingYear: null
  };
}
