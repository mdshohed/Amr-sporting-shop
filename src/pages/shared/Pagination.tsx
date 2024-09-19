import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationComponent = () => {
  return (
    <div className="flex justify-between items-center py-4 border border-s-0 border-e-0 border-t-1 border-b-1 mt-4">
      <div> 
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious  />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink >1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink >2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink >3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext  />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

      </div>
      
      {/* <div>Showing 1 to 20 of 100</div> */}
    </div>
   
  );
};

export default PaginationComponent;