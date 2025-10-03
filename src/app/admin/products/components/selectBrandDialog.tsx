import SelectDialog from "@/components/selectDialog";
import { Brand } from "@/interfaces";
import { apiService } from "@/lib/api";

interface SelectBrandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (brand: Brand) => void;
}

export function SelectBrandDialog({
  open,
  onOpenChange,
  onSelect,
}: SelectBrandDialogProps) {
  return (
    <SelectDialog<Brand>
      open={open}
      title="Select brand"
      description="Choose a brand from the list below."
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      fetchItemsFunc={apiService.brands.getBrands}
      getId={(brand) => brand.id}
      getName={(brand) => brand.name}
    />
  );
}
