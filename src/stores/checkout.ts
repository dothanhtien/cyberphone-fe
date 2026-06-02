import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Cart } from "@/storefront/cart/types";
import { Address } from "@/storefront/checkout/types";

interface CheckoutState {
  activeCart?: Cart;
  shippingAddress?: Address;
  hasHydrated: boolean;

  setActiveCart: (cart: Cart) => void;
  clearActiveCart: () => void;

  setShippingAddress: (address: Address) => void;
  resetShippingAddress: () => void;

  setHasHydrated: (state: boolean) => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  devtools(
    persist(
      (set) => ({
        activeCart: undefined,
        shippingAddress: undefined,
        hasHydrated: false,

        setActiveCart: (cart) => set({ activeCart: cart }),

        clearActiveCart: () => set({ activeCart: undefined }),

        setShippingAddress: (address) => set({ shippingAddress: address }),

        resetShippingAddress: () =>
          set({
            shippingAddress: undefined,
          }),

        setHasHydrated: (state) => set({ hasHydrated: state }),
      }),
      {
        name: "checkout-storage",

        onRehydrateStorage: () => (state) => {
          if (state?.activeCart) {
            const expired =
              new Date(state.activeCart.expiresAt).getTime() < Date.now();
            if (expired) state.clearActiveCart();
          }
          state?.setHasHydrated(true);
        },
      },
    ),
    { name: "checkout-store" },
  ),
);
