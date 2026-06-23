"use client";

import { useState } from "react";

import { useUpdateOrderStatus } from "../mutations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/enums";

const ADVANCE_ACTION: Partial<
  Record<OrderStatus, { label: string; target: OrderStatus }>
> = {
  [OrderStatus.PENDING]: {
    label: "Confirm Order",
    target: OrderStatus.CONFIRMED,
  },
  [OrderStatus.CONFIRMED]: {
    label: "Mark as Processing",
    target: OrderStatus.PROCESSING,
  },
  [OrderStatus.PROCESSING]: {
    label: "Mark as Shipped",
    target: OrderStatus.SHIPPING,
  },
  [OrderStatus.SHIPPING]: {
    label: "Mark as Completed",
    target: OrderStatus.COMPLETED,
  },
};

const CANCELLABLE_STATUSES = new Set([
  OrderStatus.PENDING,
  OrderStatus.CONFIRMED,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPING,
]);

interface OrderStatusActionsProps {
  orderId: string;
  currentStatus: OrderStatus;
}

type PendingAction = { target: OrderStatus; label: string } | null;

export function OrderStatusActions({
  orderId,
  currentStatus,
}: OrderStatusActionsProps) {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const mutation = useUpdateOrderStatus({
    onSuccess: () => setPendingAction(null),
    onError: () => setPendingAction(null),
  });

  const advanceAction = ADVANCE_ACTION[currentStatus];
  const canCancel = CANCELLABLE_STATUSES.has(currentStatus);

  if (!advanceAction && !canCancel) {
    return null;
  }

  const handleConfirm = () => {
    if (!pendingAction) return;
    mutation.mutate({
      id: orderId,
      status: pendingAction.target,
      label: pendingAction.label,
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        {advanceAction && (
          <Button
            disabled={mutation.isPending}
            className="w-full sm:w-auto"
            onClick={() => setPendingAction(advanceAction)}
          >
            {advanceAction.label}
          </Button>
        )}
        {canCancel && (
          <Button
            variant="outline"
            disabled={mutation.isPending}
            className="w-full sm:w-auto text-destructive hover:text-destructive"
            onClick={() =>
              setPendingAction({
                target: OrderStatus.CANCELLED,
                label: "Cancel Order",
              })
            }
          >
            Cancel Order
          </Button>
        )}
      </div>

      <AlertDialog
        open={pendingAction !== null}
        onOpenChange={(open) => {
          if (!open && !mutation.isPending) setPendingAction(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to{" "}
              <span className="font-medium text-foreground lowercase">
                {pendingAction?.label}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={mutation.isPending}>
              No, go back
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={mutation.isPending}
              variant={
                pendingAction?.target === OrderStatus.CANCELLED
                  ? "destructive"
                  : "default"
              }
              onClick={handleConfirm}
            >
              {mutation.isPending ? "Processing…" : "Yes, confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
