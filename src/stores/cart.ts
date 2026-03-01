import { Cart, CartItem } from "@/storefront/cart/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CartStore {
  cart?: Cart;
  hasHydrated: boolean;

  setCart: (cart: Cart) => void;

  addItem: (item: CartItem) => void;

  totalItems: () => number;

  subtotal: () => number;

  setHasHydrated: (state: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cart: undefined,
        hasHydrated: false,

        setCart: (cart) => set({ cart }),

        addItem: (item) =>
          set((state) => {
            if (!state.cart) return state;

            const existing = state.cart.items.find((i) => i.id === item.id);

            const newItems = existing
              ? state.cart.items.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
                )
              : [...state.cart.items, { ...item, quantity: 1 }];

            return {
              cart: { ...state.cart, items: newItems },
            };
          }),

        totalItems: () =>
          get().cart?.items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0,

        subtotal: () =>
          get().cart?.items?.reduce(
            (sum, item) => sum + (item.salePrice ?? item.price) * item.quantity,
            0,
          ) ?? 0,

        setHasHydrated: (state) => set({ hasHydrated: state }),
      }),
      {
        name: "cart-storage",
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      },
    ),
    { name: "cart-store" },
  ),
);
