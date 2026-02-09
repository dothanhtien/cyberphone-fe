import { cn } from "@/lib/utils";
import React from "react";

interface PageHeadingProps extends React.ComponentProps<"h1"> {
  children: React.ReactNode;
}

export function PageHeading({ children, className }: PageHeadingProps) {
  return <h1 className={cn("text-2xl font-bold", className)}>{children}</h1>;
}
