export interface CreatePaginationOptions {
  page: number;
  rowsPerPage: number;
  count: number;
}

export function createPaginationRange({
  page,
  rowsPerPage,
  count,
}: CreatePaginationOptions) {
  return {
    from: (page - 1) * rowsPerPage,
    to: page * rowsPerPage - 1,
  };
}

export function calcTotalPage({ rowsPerPage, count }: CreatePaginationOptions) {
  return Math.ceil(count / rowsPerPage);
}
