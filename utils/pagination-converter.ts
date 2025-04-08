/**
 * Convert page `index` and `size` to `start` and `limit`.
 * @param pageIndex - Index of page, starting from 0.
 * @param pageSize - Page size.
 * @returns `start` and `limit`.
 */
export const paginationConverter = ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  const start = pageIndex * pageSize;
  const limit = pageSize;

  return [start, limit];
};
