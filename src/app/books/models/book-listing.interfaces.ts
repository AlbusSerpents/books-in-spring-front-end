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

export function newBookInfo(): BookInfo {
  return {
    id: null,
    name: null,
    author: null,
    bookCover: null,
    publishingYear: null
  };
}

export function newBookSearch(): BookSearch {
  return {
    name: null,
    author: null,
    publishingYear: null
  };
}
