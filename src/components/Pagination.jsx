import React, { useEffect, useState } from 'react';
import { formatNumbersWithCommas } from './../utils/formatNumbersWithCommas';

export default function Pagination({ pages = 0, total = 0, limit = 32, setPage, page = 1 }) {

  const [visibleRange, setVisibleRange] = useState([1, Math.min(4, Math.max(1, pages))]);

  // Update visibleRange when pages change
  useEffect(() => {
    if (pages > 0) {
      setVisibleRange([1, Math.min(4, pages)]);
    }
  }, [pages]);

  // Handle changing the page
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  // Handle previous button
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Handle next button
  const handleNext = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  const first = (page - 1) * limit + 1 || 0;
  const last = Math.min(page * limit, total) || 0;

  // Function to show the next 4 pages
  const handleNext4Pages = () => {
    if (visibleRange[1] < pages) {
      const start = visibleRange[1] + 1;
      const end = Math.min(start + 3, pages);
      setVisibleRange([start, end]);
    }
  };

  // Function to show the previous 4 pages
  const handlePrevious4Pages = () => {
    if (visibleRange[0] > 1) {
      const start = Math.max(1, visibleRange[0] - 4);
      const end = visibleRange[0] - 1;
      setVisibleRange([start, end]);
    }
  };

  // Generate array of page numbers
  const pageNumbers = pages > 0 ? [...Array(pages).keys()].map((n) => n + 1) : [];

  return (
    <div className='border p-2'>
      <div className="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
        {/* Pagination */}
        <nav className="flex items-center -space-x-px" aria-label="Pagination">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrevious}
            disabled={page === 1}
            className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            aria-label="Previous"
          >
            <svg
              className="shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            <span className="sr-only">Previous</span>
          </button>

          {/* Previous 4 Pages Button */}
          {visibleRange[0] > 1 && (
            <button
              type="button"
              onClick={handlePrevious4Pages}
              className="min-h-[36px] min-w-[36px] group flex justify-center items-center text-gray-400 hover:text-blue-600 p-2 text-sm focus:outline-none"
            >
              <span className="group-hover:hidden text-xs">•••</span>
              <svg
                className="group-hover:block hidden shrink-0 size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L1 12l6-5"></path>
                <path d="M15 17L9 12l6-5"></path>
              </svg>
            </button>
          )}

          {/* Page Numbers */}
          {pageNumbers.slice(visibleRange[0] - 1, visibleRange[1]).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => handlePageChange(number)}
              className={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm border border-gray-200 first:rounded-s-lg last:rounded-e-lg focus:outline-none ${ page === number
                ? 'bg-[#0071BC] text-white dark:bg-neutral-500 dark:text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-100 dark:bg-neutral-600 dark:text-white'
                }`}
              aria-current={page === number ? 'page' : undefined}
            >
              {number}
            </button>
          ))}

          {/* Next 4 Pages Button (if applicable) */}
          {visibleRange[1] < pages && (
            <button
              type="button"
              onClick={handleNext4Pages}
              className="min-h-[36px] min-w-[36px] flex group justify-center items-center text-gray-400 hover:text-blue-600 p-2 text-sm focus:outline-none"
            >
              <span className="group-hover:hidden text-xs">•••</span>
              <svg
                className="group-hover:block hidden shrink-0 size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 17l5-5-5-5"></path>
                <path d="M13 17l5-5-5-5"></path>
              </svg>
            </button>
          )}

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={page === pages}
            className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            aria-label="Next"
          >
            <svg
              className="shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
            <span className="sr-only">Next</span>
          </button>

        </nav>

        <p>Showing {formatNumbersWithCommas(first)} to {formatNumbersWithCommas(last)} of {formatNumbersWithCommas(total)} books</p>

      </div>
    </div>
  );
}
