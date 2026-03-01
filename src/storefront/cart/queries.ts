import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { useCartStore } from "@/stores/cart";
import { ResolveCartRequest } from "./types";
import { storefrontCartApi } from "./api";

export const useStorefrontCart = (params: ResolveCartRequest = {}) => {
  const cart = useCartStore((state) => state.cart);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const setCart = useCartStore((state) => state.setCart);

  const resolvedParams = {
    sessionId: params.sessionId ?? cart?.sessionId,
    userId: params.userId ?? cart?.userId,
  };

  return useQuery({
    queryKey: queryKeys.storefront.cart.details(resolvedParams),
    queryFn: async () => {
      const fetchedCart = await storefrontCartApi.resolve(resolvedParams);
      setCart(fetchedCart);
      return fetchedCart;
    },
    enabled: hasHydrated,
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
