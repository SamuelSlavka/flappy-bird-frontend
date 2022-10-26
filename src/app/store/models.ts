
export interface Paginate<T> {
  results: T[];
  page_total: number;
  total: number;
}
