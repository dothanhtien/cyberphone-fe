"use client";

import { useCallback, useEffect, useState } from "react";

import PageHeading from "@/components/pageHeading";
import { DataTable } from "@/components/tables/dataTable";
import { Brand } from "@/app/interfaces";
import { apiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { getColumns } from "./components/brandsTablecolumn";
import { BrandModal } from "./components/brandModal";
import { ConfirmDeleteBrandDialog } from "./components/confirmDeleteBrandDialog";

export default function BrandsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [pageCount, setPageCount] = useState(0);

  const [brandModal, setBrandModal] = useState<{
    open: boolean;
    action: "create" | "edit";
    brand: Brand | null;
  }>({ open: false, action: "create", brand: null });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    brand: Brand | null;
  }>({ open: false, brand: null });

  const fetchBrands = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await apiService.brands.getBrands({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      if (data) {
        setBrandList(data.items);
        setPagination({
          pageIndex: data.currentPage - 1,
          pageSize: data.itemsPerPage,
        });
        setPageCount(Math.ceil(data.totalCount / data.itemsPerPage));
      }
    } catch (err) {
      console.error("Failed to fetch brands:", err);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleCreateBrand = () =>
    setBrandModal({ open: true, action: "create", brand: null });

  const handleEditBrand = (brand: Brand) =>
    setBrandModal({ open: true, action: "edit", brand });

  const handleCloseBrandModal = () =>
    setBrandModal({ open: false, action: "create", brand: null });

  const handleDeleteBrand = (brand: Brand) =>
    setDeleteDialog({ open: true, brand });

  const handleCloseDeleteDialog = () =>
    setDeleteDialog({ open: false, brand: null });

  return (
    <>
      <div className="flex justify-between">
        <PageHeading>Brands</PageHeading>

        <Button onClick={handleCreateBrand}>New brand</Button>
      </div>

      <DataTable
        columns={getColumns({
          onEdit: handleEditBrand,
          onDelete: handleDeleteBrand,
        })}
        data={brandList}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={pageCount}
      />

      <BrandModal
        action={brandModal.action}
        data={brandModal.brand}
        open={brandModal.open}
        onOpenChange={(isOpen) => !isOpen && handleCloseBrandModal()}
        onSuccess={fetchBrands}
      />

      <ConfirmDeleteBrandDialog
        data={deleteDialog.brand}
        open={deleteDialog.open}
        onOpenChange={(isOpen) => !isOpen && handleCloseDeleteDialog()}
        onSuccess={fetchBrands}
      />
    </>
  );
}
