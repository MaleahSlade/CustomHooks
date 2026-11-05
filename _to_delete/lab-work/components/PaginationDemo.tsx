import { useMemo, useState } from 'react';
import { usePagination } from '../hooks/usePagination';

const TOTAL_ITEMS = 123;
const PAGE_SIZE_OPTIONS = [5, 10, 20, 25];

export default function PaginationDemo() {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const items = useMemo(
    () => Array.from({ length: TOTAL_ITEMS }, (_, i) => `Item ${i + 1}`),
    [],
  );

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  } = usePagination({ totalItems: items.length, itemsPerPage });

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="demo">
      <h2>Pagination Demo</h2>

      <label>
        Items per page:{' '}
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setPage(1);
          }}
        >
          {PAGE_SIZE_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      <p>Total Items: {items.length}</p>

      <ul className="item-list">
        {visibleItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="controls">
        <button onClick={prevPage} disabled={!canPrevPage}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>

      <p>
        {itemsOnCurrentPage > 0
          ? `Showing items ${startIndex + 1} - ${endIndex + 1} (Total on this page: ${itemsOnCurrentPage})`
          : 'No items to show'}
      </p>

      <div className="page-buttons">
        {pageNumbers.map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={n === currentPage ? 'active' : undefined}
            aria-current={n === currentPage ? 'page' : undefined}
          >
            {n}
          </button>
        ))}
      </div>
    </section>
  );
}
