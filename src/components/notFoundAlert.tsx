import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "./ui/alert";

export function NotFoundAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  );
}
