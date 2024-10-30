import {ArrowLeft, ArrowRight} from 'lucide-react';
import {Button} from './button';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({totalPages, currentPage, onPageChange}: Props) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Adjust this number based on how many buttons you want to show

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return {pages, endPage};
  };

  const {pages, endPage} = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        className="border border-[#E5E7EE]"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>Previous</span>
      </Button>

      <div className="flex items-center gap-[2px]">
        {pages.map(page => (
          <Button
            key={page}
            variant="ghost"
            size="icon"
            className={
              page === currentPage ? 'bg-[#F5F6F8]' : 'text-pashBlack-7'
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        {totalPages > pages.length && endPage < totalPages && (
          <span className="text-pashBlack-7">...</span>
        )}
      </div>

      <Button
        variant="ghost"
        className="border border-[#E5E7EE]"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <span>Next</span>
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};
