"use client";

import { useEffect, useState, useCallback } from "react";
import { PaginationState } from "@tanstack/react-table";

import { apiService } from "@/lib/api";
import { User } from "@/interfaces";
import { columns } from "./usersTable/columns";
import PageHeading from "@/components/pageHeading";
import { DataTable } from "@/components/tables/dataTable";

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await apiService.users.getUsers({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      if (data) {
        setUserList(data.items);
        const next = {
          pageIndex: data.currentPage - 1,
          pageSize: data.itemsPerPage,
        };
        setPagination((prev) =>
          prev.pageIndex !== next.pageIndex || prev.pageSize !== next.pageSize
            ? next
            : prev
        );
        setPageCount(
          Math.max(1, Math.ceil(data.totalCount / data.itemsPerPage))
        );
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <PageHeading>Users</PageHeading>

      <DataTable
        columns={columns}
        data={userList}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={pageCount}
      />
    </>
  );
}
