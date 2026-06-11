import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ordersApi } from "./api";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { OrderStatus } from "@/enums";
import { handleApiError } from "@/utils";

interface UpdateOrderStatusVariables {
  id: string;
  status: OrderStatus;
  label: string;
}

interface UseUpdateOrderStatusOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useUpdateOrderStatus = (options?: UseUpdateOrderStatusOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateOrderStatusVariables) =>
      ordersApi.updateStatus(id, status),
    onSuccess: (_, { label }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      toast.success(`${label} successful`);
      options?.onSuccess?.();
    },
    onError: (error) => {
      handleApiError(error, "An error occurred. Please try again.");
      options?.onError?.();
    },
  });
};
