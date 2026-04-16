import {
  AlertCircle,
  CheckCircle2,
  CircleDot,
  Clock,
  LucideProps,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "@/enums";

const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  {
    label: string;
    className: string;
    Icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  }
> = {
  [PaymentStatus.PENDING]: {
    label: "Pending",
    className:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    Icon: Clock,
  },

  [PaymentStatus.SUCCESS]: {
    label: "Success",
    className:
      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    Icon: CheckCircle2,
  },

  [PaymentStatus.FAILED]: {
    label: "Failed",
    className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    Icon: AlertCircle,
  },

  [PaymentStatus.CANCELLED]: {
    label: "Cancelled",
    className:
      "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
    Icon: XCircle,
  },
};

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = PAYMENT_STATUS_CONFIG[status] ?? {
    label: status,
    className: "",
    Icon: CircleDot,
  };

  const Icon = config.Icon;

  return (
    <div className="flex justify-center">
      <Badge
        variant="outline"
        className={`flex w-fit items-center gap-1.5 px-2 py-0.5 text-xs font-medium ${config.className}`}
      >
        <Icon className="h-3.5 w-3.5" />
        {config.label}
      </Badge>
    </div>
  );
}
