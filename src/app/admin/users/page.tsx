"use client";

import { useEffect, useState, useCallback } from "react";

import { apiService } from "@/lib/api";
import { User } from "@/app/interfaces";
import { DataTable } from "./usersTable/dataTable";
import { columns } from "./usersTable/columns";

export default function UserListingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
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
        setPagination({
          pageIndex: data.currentPage - 1,
          pageSize: data.itemsPerPage,
        });
        setPageCount(Math.ceil(data.totalCount / data.itemsPerPage));
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
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">
        User List
      </h3>

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
