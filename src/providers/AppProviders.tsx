import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from "./ReactQueryProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ReactQueryProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ReactQueryProvider>
  );
}
