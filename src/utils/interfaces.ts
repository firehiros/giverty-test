export interface Pagination<T> {
  data: T;
  page: number;
  pageSize: number;
  totalPage: number;
  totalItem: number;
  // cursor paging
  next?: string;
  hashNext?: boolean;
  previous?: string;
  hashPrevious?: boolean;
}
