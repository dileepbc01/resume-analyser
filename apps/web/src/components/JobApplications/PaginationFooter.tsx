import { ChevronLeft, ChevronRight } from "lucide-react";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

export function PaginationDemo({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pageNo = Number(searchParams.get("page_number") || "1");
  const baseUrl = usePathname();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page_number", page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="bg-secondary p-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink>
              {pageNo !== 1 ? (
                <Link
                  href={createPageUrl(Math.max(1, pageNo - 1))}
                  className="flex items-center justify-center">
                  <span className="mr-10 flex items-center justify-center space-x-1 hover:cursor-pointer">
                    <ChevronLeft className="h-4 w-4" />
                    <span>Prev </span>
                  </span>
                </Link>
              ) : (
                <span className="mr-10 flex items-center justify-center space-x-1 hover:cursor-pointer">
                  <ChevronLeft className="h-4 w-4" /> <span>Prev </span>
                </span>
              )}
            </PaginationLink>
          </PaginationItem>
          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === pageNo}>
                <Link href={createPageUrl(page)}>{page}</Link>
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink>
              {pageNo !== totalPages ? (
                <Link
                  href={createPageUrl(Math.min(totalPages, pageNo + 1))}
                  className="flex items-center justify-center">
                  <span className="ml-10 flex items-center justify-center space-x-1 hover:cursor-pointer">
                    <span>Next </span> <ChevronRight className="h-4 w-4" />
                  </span>
                </Link>
              ) : (
                <span className="ml-10 flex items-center justify-center space-x-1 hover:cursor-pointer">
                  <span>Next </span> <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
