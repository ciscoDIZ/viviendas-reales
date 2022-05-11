export interface Paginate<T> {
    list: T[];
    pagination: {
      total: number;
      limit: number;
      pages: number;
      page: number;
      paginationCounter: number;
      hasPrev: boolean;
      hasNext: boolean;
      prev?: number;
      next?: number;
    }
}
