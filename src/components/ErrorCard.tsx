import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertTitle } from "./ui/alert";

interface ErrorCardProps {
  title: string;
}

export function ErrorCard({ title }: ErrorCardProps) {
  return (
    <Alert variant="destructive" className="max-w-md py-4">
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
    </Alert>
  );
}
