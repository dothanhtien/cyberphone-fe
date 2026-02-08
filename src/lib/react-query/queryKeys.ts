import { PaginationParams } from "@/types";

export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    me: () => ["auth", "me"] as const,
  },

  categories: {
    all: ["categories"] as const,
    list: (params?: PaginationParams) =>
      ["categories", "list", params] as const,
  },
};
