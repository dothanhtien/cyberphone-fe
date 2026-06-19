import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function ProfileSkeleton() {
  return (
    <div className="max-w-230 space-y-6">
      <Card className="overflow-hidden">
        <div className="h-24 bg-muted/50" />

        <CardContent className="pt-0 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6 -mt-10">
            <Skeleton className="h-20 w-20 rounded-full ring-4 ring-background shrink-0" />

            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between pb-1">
              <div className="space-y-2">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-56" />
              </div>

              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
            </div>
          </div>

          <Separator className="mt-5 mb-4" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${i === 2 ? "col-span-2" : ""}`}
              >
                <Skeleton className="h-4 w-4 mt-0.5 shrink-0" />

                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-5">
            <Skeleton className="h-8 w-8 rounded-md" />

            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <Skeleton className="h-8 w-16" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-36" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
