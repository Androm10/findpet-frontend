export type Paginated<T> = {
  result: T[];
  pages: number;
  limit: number;
  page: number | null;
  count: number;
};
