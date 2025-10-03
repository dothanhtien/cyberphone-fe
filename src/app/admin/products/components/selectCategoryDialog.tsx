import SelectDialog from "@/components/selectDialog";
import { Category } from "@/interfaces";
import { apiService } from "@/lib/api";

interface SelectCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (category: Category) => void;
}

export function SelectCategoryDialog({
  open,
  onOpenChange,
  onSelect,
}: SelectCategoryDialogProps) {
  return (
    <SelectDialog<Category>
      open={open}
      title="Select category"
      description="Choose a category from the list below."
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      fetchItemsFunc={apiService.categories.getCategories}
      getId={(category) => category.id}
      getName={(category) => category.name}
    />
  );
}
