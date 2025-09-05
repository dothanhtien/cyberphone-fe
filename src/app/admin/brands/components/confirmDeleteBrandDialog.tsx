import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Brand } from "@/app/interfaces";
import { apiService } from "@/lib/api";

interface ConfirmDeleteBrandDialogProps {
  data: Brand | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ConfirmDeleteBrandDialog({
  data,
  open,
  onOpenChange,
  onSuccess,
}: ConfirmDeleteBrandDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDeleteBrand = async () => {
    if (!data?.id) {
      toast.error("Brand ID is missing, cannot delete");
      return;
    }

    try {
      setLoading(true);
      await apiService.brands.deleteBrand(data.id);
      toast.success(`Brand "${data.name}" deleted successfully`);
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      console.error("Error deleting brand:", err);
      toast.error("Failed to delete brand. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete brand {data?.name ? `"${data.name}"` : ""}
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the brand
            and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteBrand} disabled={loading}>
            {loading ? "Deleting..." : "Delete Brand"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
