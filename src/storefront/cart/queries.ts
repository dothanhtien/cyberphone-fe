import { useQuery } from "@tanstack/react-query";

import { storefrontCartApi } from "./api";
import { ResolveCartRequest } from "./types";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";

export const useStorefrontCart = ({ enabled = true } = {}) => {
  const cart = useCartStore((state) => state.cart);
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const setCart = useCartStore((state) => state.setCart);

  const resolvedParams: ResolveCartRequest = {
    sessionId: cart?.sessionId,
    customerId: cart?.userId ?? user?.id,
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
