import { PaginationState } from "@tanstack/react-table";
import { useCallback, useState } from "react";

export function usePagination() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);

  const updatePageCount = useCallback(
    (totalCount: number, itemsPerPage: number) => {
      setPageCount(Math.max(1, Math.ceil(totalCount / itemsPerPage)));
    },
    [],
  );

  const updatePagination = useCallback(
    (currentPage: number, itemsPerPage: number) => {
      const next = {
        pageIndex: currentPage - 1,
        pageSize: itemsPerPage,
      };
      setPagination((prev) =>
        prev.pageIndex !== next.pageIndex || prev.pageSize !== next.pageSize
          ? next
          : prev,
      );
    },
    [],
  );

  return {
    pagination,
    setPagination,
    pageCount,
    updatePageCount,
    updatePagination,
  };
}
