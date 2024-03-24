import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";


export const PaginationComponent = ({totalItems, itemsPerPage, currentPage, setCurrentPage}) => {

    let pages = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pages.push(i);
    }
  
    const handlePrevPage = () => {
     if (currentPage > 1){
        setCurrentPage(currentPage - 1);
     }
    };
  
    const handleNextPage = () => {
      if (currentPage < pages.length){
        setCurrentPage(currentPage + 1);
      }
    };
  
    return (
      <Pagination className="text-white">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} className='cursor-pointer'/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={handleNextPage} className='cursor-pointer'/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
};
  