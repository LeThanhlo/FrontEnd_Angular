export interface PagedResult {
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
}

export interface User {
  Username: string;
  Password: string;
  Fullname: string;
  IsDel: boolean;
}
