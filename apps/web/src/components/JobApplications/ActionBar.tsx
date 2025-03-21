import { GetApplicationsDto } from "@repo/types";
import { ArrowDown, ArrowUp, Search } from "lucide-react";

import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

const ActionBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortBy: GetApplicationsDto["sort_by"][] = ["Experience", "Name", "Resume Score"];
  const searchBy: GetApplicationsDto["search_by"][] = ["Role", "Name", "Location"];

  // Initialize state from URL params
  const [selectedSort, setSelectedSort] = useState<GetApplicationsDto["sort_by"]>(
    (searchParams.get("sort_by") as GetApplicationsDto["sort_by"]) || "Name"
  );
  const [selectedSearchBy, setSelectedSearchBy] = useState<GetApplicationsDto["search_by"]>(
    (searchParams.get("search_by") as GetApplicationsDto["search_by"]) || "Name"
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search_term") || "");
  const [sortOrder, setSortOrder] = useState<"Asc" | "Desc">(
    (searchParams.get("sort_order") as "Asc" | "Desc") || "Asc"
  );

  const updateQueryParams = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedSort) params.set("sort_by", selectedSort);
    if (sortOrder) params.set("sort_order", sortOrder);
    if (selectedSearchBy && searchQuery) {
      params.set("search_by", selectedSearchBy);
      params.set("search_term", searchQuery);
    } else {
      params.delete("search_by");
      params.delete("search_term");
    }

    router.push(`?${params.toString()}`);
  };

  // Update URL when filters change
  useEffect(() => {
    updateQueryParams();
  }, [selectedSort, sortOrder, selectedSearchBy, searchQuery]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "Asc" ? "Desc" : "Asc");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="border-b px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder={`Search by ${selectedSearchBy}`}
                className="w-64 pl-9"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Search className="text-muted-foreground absolute left-3 h-4 w-4" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm">
                  Search by: {selectedSearchBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {searchBy.map((option) => (
                  <DropdownMenuItem key={option} onClick={() => setSelectedSearchBy(option)}>
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Sort by</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm">
                  {selectedSort}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sortBy.map((option) => (
                  <DropdownMenuItem key={option} onClick={() => setSelectedSort(option)}>
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleSortOrder}
              title={sortOrder === "Asc" ? "Ascending" : "Descending"}>
              {sortOrder === "Asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
