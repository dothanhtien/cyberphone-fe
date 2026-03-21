import { Spinner } from "./ui/spinner";

export function PageLoading() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex items-center gap-2">
        <Spinner className="size-6" />
        <span>Loading...</span>
      </div>
    </div>
  );
}
