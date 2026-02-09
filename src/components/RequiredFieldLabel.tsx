import { FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export function RequiredFieldLabel({
  children,
  ...props
}: React.ComponentProps<typeof FieldLabel>) {
  return (
    <FieldLabel {...props} className={cn(props.className, "gap-1")}>
      {children}
      <span className="text-destructive">*</span>
    </FieldLabel>
  );
}
