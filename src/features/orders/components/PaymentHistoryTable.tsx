"use client";

import { AlertCircle, ExternalLink } from "lucide-react";

import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { OrderPayment } from "../types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PaymentStatus } from "@/enums";
import { capitalize, formatCurrency, formatDateTime } from "@/utils";

interface PaymentHistoryTableProps {
  payments: OrderPayment[];
}

export function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
  if (payments.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        No payment records found
      </p>
    );
  }

  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Created At</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Paid At</TableHead>
            <TableHead>Refunded At</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="text-sm text-muted-foreground">
                {formatDateTime(payment.createdAt)}
              </TableCell>
              <TableCell className="text-sm">
                {capitalize(payment.provider)}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {payment.transactionId ?? "—"}
              </TableCell>
              <TableCell className="text-sm">
                <span className="font-medium">
                  {formatCurrency(payment.amount)}
                </span>
                <span className="ml-1 text-xs text-muted-foreground">
                  {payment.currency}
                </span>
              </TableCell>
              <TableCell>
                {payment.status === PaymentStatus.FAILED &&
                payment.failureReason ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex cursor-default items-center gap-1.5">
                        <PaymentStatusBadge status={payment.status} />
                        <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {payment.failureReason}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <PaymentStatusBadge status={payment.status} />
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {payment.paidAt ? formatDateTime(payment.paidAt) : "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {payment.refundedAt ? formatDateTime(payment.refundedAt) : "—"}
              </TableCell>
              <TableCell>
                {payment.checkoutUrl &&
                  payment.status === PaymentStatus.PENDING && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1.5 text-xs"
                      asChild
                    >
                      <a
                        href={payment.checkoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Pay Now
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
