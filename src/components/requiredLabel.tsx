import { ReactNode } from "react";
import clsx from "clsx";

import { FormLabel } from "@/components/ui/form";

interface RequiredLabelProps {
  children: ReactNode;
  className?: string;
}

export function RequiredLabel({ children, className }: RequiredLabelProps) {
  return (
    <FormLabel className={clsx("gap-1", className)}>
      {children} <span className="text-red-500">*</span>
    </FormLabel>
  );
}
