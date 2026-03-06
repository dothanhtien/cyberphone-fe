import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Address } from "@/storefront/checkout/types";

export type PaymentProvider = "STRIPE" | "MOMO" | "VNPAY";

interface CheckoutState {
  shippingAddress?: Address;
  hasHydrated: boolean;

  setShippingAddress: (address: Address) => void;

  setHasHydrated: (state: boolean) => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  devtools(
    persist(
      (set) => ({
        shippingAddress: undefined,
        hasHydrated: false,

        setShippingAddress: (address) => set({ shippingAddress: address }),

        reset: () =>
          set({
            shippingAddress: undefined,
          }),

        setHasHydrated: (state) => set({ hasHydrated: state }),
      }),
      {
        name: "checkout-storage",

        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      },
    ),
    { name: "checkout-store" },
  ),
);
