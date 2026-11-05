import { useCallback, useState } from 'react';

export interface UsePaginationOptions {
  /** Total number of items to paginate. */
  totalItems: number;
  /** Items shown per page. Defaults to 10. */
  itemsPerPage?: number;
  /** Page to start on (1-based). Defaults to 1. */
  initialPage?: number;
}

export interface UsePaginationResult {
  currentPage: number;
  totalPages: number;
  /** 0-based index of the first item on the current page. */
  startIndex: number;
  /** 0-based index of the last item on the current page (inclusive). -1 when there are no items. */
  endIndex: number;
  itemsOnCurrentPage: number;
  setPage: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canNextPage: boolean;
  canPrevPage: boolean;
}

export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationOptions): UsePaginationResult {
  const safeItemsPerPage = Math.max(1, Math.floor(itemsPerPage));
  const safeTotalItems = Math.max(0, Math.floor(totalItems));
  const totalPages = Math.ceil(safeTotalItems / safeItemsPerPage);
  const maxPage = Math.max(1, totalPages);

  const clamp = useCallback(
    (page: number) => Math.min(Math.max(1, Math.floor(page)), maxPage),
    [maxPage],
  );

  const [page, setPageState] = useState(initialPage);

  // Derive the page on every render so it stays valid if totalItems or
  // itemsPerPage shrink the number of pages.
  const currentPage = clamp(page);

  const startIndex = (currentPage - 1) * safeItemsPerPage;
  const endIndex = Math.min(startIndex + safeItemsPerPage, safeTotalItems) - 1;
  const itemsOnCurrentPage = Math.max(0, endIndex - startIndex + 1);

  const setPage = useCallback(
    (pageNumber: number) => setPageState(clamp(pageNumber)),
    [clamp],
  );
  const nextPage = useCallback(
    () => setPageState((p) => clamp(clamp(p) + 1)),
    [clamp],
  );
  const prevPage = useCallback(
    () => setPageState((p) => clamp(clamp(p) - 1)),
    [clamp],
  );

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage: currentPage < totalPages,
    canPrevPage: currentPage > 1,
  };
}
