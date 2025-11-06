import { Dispatch, SetStateAction } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  hasNext: boolean;
  onPageChange: Dispatch<SetStateAction<number>>;
}

export default function Pagination({
  currentPage,
  totalPage,
  hasNext,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="cursor-pointer text-xs text-gray-600 hover:text-gray-900 font-medium px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        ← Previous
      </button>

      <span className="text-xs text-gray-600 font-medium">
        Page {currentPage} of {totalPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="cursor-pointer text-xs text-gray-600 hover:text-gray-900 font-medium px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        Next →
      </button>
    </div>
  );
}
