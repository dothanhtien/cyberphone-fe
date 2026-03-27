import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";

export function PageLoading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-full flex justify-center items-center",
        className ? className : "",
      )}
    >
      <div className="flex items-center gap-2">
        <Spinner className="size-6" />
        <span>Loading...</span>
      </div>
    </div>
  );
}
