import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { useCartStore } from "@/stores/cart";
import { storefrontCartApi } from "./api";

export const useStorefrontCart = ({ enabled = true } = {}) => {
  const cart = useCartStore((state) => state.cart);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const setCart = useCartStore((state) => state.setCart);

  const resolvedParams = {
    sessionId: cart?.sessionId,
    userId: cart?.userId,
  };

  return useQuery({
    queryKey: queryKeys.storefront.cart.details(resolvedParams),
    queryFn: async () => {
      const fetchedCart = await storefrontCartApi.resolve(resolvedParams);
      setCart(fetchedCart);
      return fetchedCart;
    },
    enabled: hasHydrated && enabled,
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
