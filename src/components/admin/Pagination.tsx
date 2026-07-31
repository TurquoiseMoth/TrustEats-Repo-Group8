import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center gap-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          className={[
            "w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
            page === currentPage
              ? "bg-primary border-primary text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-50",
          ].join(" ")}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

export default Pagination;