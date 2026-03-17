import axios from "axios";
import { toast } from "sonner";

import { ApiError } from "@/types";

export function handleApiError(
  error: unknown,
  fallbackMessage = "Something went wrong",
  showToast = true,
) {
  let message = fallbackMessage;

  if (axios.isAxiosError<ApiError>(error)) {
    message = error.response?.data?.message || fallbackMessage;
  }

  console.error(message, error);

  if (showToast) {
    toast.error(message);
  }
}
