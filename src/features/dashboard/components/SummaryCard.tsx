import { LucideProps } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  isLoading: boolean;
  iconVariant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
}

export function SummaryCard({
  title,
  value,
  icon: Icon,
  isLoading,
  iconVariant = "secondary",
}: SummaryCardProps) {
  return (
    <Card className="py-6 px-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-6">
          <Badge variant={iconVariant} className="p-2 rounded-md">
            <Icon size={16} />
          </Badge>
          <div>{title}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Spinner />
        ) : (
          <p className="font-semibold block px-1.5 text-lg">{value}</p>
        )}
      </CardContent>
    </Card>
  );
}
