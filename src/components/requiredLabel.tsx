import { ReactNode } from "react";

import { FormLabel } from "@/components/ui/form";

export function RequiredLabel({ children }: { children: ReactNode }) {
  return (
    <FormLabel className="gap-1">
      {children} <span className="text-red-500">*</span>
    </FormLabel>
  );
}
