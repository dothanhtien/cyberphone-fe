import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useStorefrontCart } from "../queries";
import {
  useDecreaseCartItemQuantity,
  useIncreaseCartItemQuantity,
  useRemoveCartItem,
} from "../mutations";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_IMAGE } from "@/constants";
import { useCartStore } from "@/stores/cart";
import { formatCurrency } from "@/utils";

export function MiniCart() {
  const [open, setOpen] = useState(false);
  const [pendingDecreaseIds, setPendingDecreaseIds] = useState<Set<string>>(
    new Set(),
  );
  const [pendingIncreaseIds, setPendingIncreaseIds] = useState<Set<string>>(
    new Set(),
  );
  const [pendingRemoveIds, setPendingRemoveIds] = useState<Set<string>>(
    new Set(),
  );

  const router = useRouter();
  const canQueryCart = useCartStore((state) => state.canQueryCart);
  const { cart, hasHydrated } = useCartStore((state) => state);

  const totalItems = useCartStore((state) => state.totalItems);
  const subtotal = useCartStore((state) => state.subtotal);
  const increaseItemQuantity = useCartStore(
    (state) => state.increaseItemQuantity,
  );
  const decreaseItemQuantity = useCartStore(
    (state) => state.decreaseItemQuantity,
  );
  const removeItem = useCartStore((state) => state.removeItem);

  const increaseCartItemQuantityMutation = useIncreaseCartItemQuantity();
  const decreaseCartItemQuantityMutation = useDecreaseCartItemQuantity();
  const removeCartItemMutation = useRemoveCartItem();

  useStorefrontCart({ enabled: hasHydrated && canQueryCart });

  const itemCount = totalItems();

  if (!hasHydrated) return null;

  const addPending = (set: Set<string>, id: string) => new Set([...set, id]);
  const removePending = (set: Set<string>, id: string) => {
    const next = new Set(set);
    next.delete(id);
    return next;
  };

  const handleIncrease = (itemId: string) => {
    if (!cart) return;
    setPendingIncreaseIds((prev) => addPending(prev, itemId));
    increaseCartItemQuantityMutation.mutate(
      { cartId: cart.id, itemId },
      {
        onSuccess: () => increaseItemQuantity(itemId),
        onSettled: () =>
          setPendingIncreaseIds((prev) => removePending(prev, itemId)),
      },
    );
  };

  const handleDecrease = (itemId: string) => {
    if (!cart) return;
    setPendingDecreaseIds((prev) => addPending(prev, itemId));
    decreaseCartItemQuantityMutation.mutate(
      { cartId: cart.id, itemId },
      {
        onSuccess: () => decreaseItemQuantity(itemId),
        onSettled: () =>
          setPendingDecreaseIds((prev) => removePending(prev, itemId)),
      },
    );
  };

  const handleRemove = (itemId: string) => {
    if (!cart) return;
    setPendingRemoveIds((prev) => addPending(prev, itemId));
    removeCartItemMutation.mutate(
      { cartId: cart.id, itemId },
      {
        onSuccess: () => removeItem(itemId),
        onSettled: () =>
          setPendingRemoveIds((prev) => removePending(prev, itemId)),
      },
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Open cart (${itemCount} items)`}
        >
          <div className="relative">
            <ShoppingCart className="size-4" />
            {!!itemCount && (
              <span className="absolute -top-2.5 -right-2.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-96 p-0 max-sm:w-[calc(100vw-2rem)] mini-cart-popup"
      >
        <PopoverHeader className="px-4 py-3">
          <PopoverTitle className="text-base font-semibold">
            My Cart{" "}
            <span className="text-muted-foreground font-normal text-sm">
              ({itemCount})
            </span>
          </PopoverTitle>
        </PopoverHeader>

        <Separator />

        {(cart?.items?.length ?? 0) === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
            <ShoppingCart className="size-8 opacity-30" />
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <div className="max-h-105 overflow-y-auto divide-y">
            {(cart?.items ?? []).map((item) => (
              <div key={item.id} className="flex gap-3 p-4">
                <div className="shrink-0 rounded-lg border bg-muted/30 p-1">
                  <Image
                    src={item.imageUrl ?? DEFAULT_IMAGE}
                    alt=""
                    loading="eager"
                    width={56}
                    height={56}
                    className="size-14 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <p className="text-sm font-medium leading-tight truncate">
                    {item.variantName}
                  </p>
                  <p className="text-sm font-semibold text-red-600">
                    {formatCurrency(item.salePrice ?? item.price)} VND
                  </p>

                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center rounded-md">
                      <Button
                        variant="outline"
                        size="icon-xs"
                        onClick={() => handleDecrease(item.id)}
                        disabled={pendingDecreaseIds.has(item.id)}
                        aria-label={`Decrease quantity of ${item.variantName}`}
                      >
                        <Minus />
                      </Button>
                      <span className="w-8 text-center text-sm tabular-nums">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon-xs"
                        onClick={() => handleIncrease(item.id)}
                        disabled={pendingIncreaseIds.has(item.id)}
                        aria-label={`Increase quantity of ${item.variantName}`}
                      >
                        <Plus />
                      </Button>
                    </div>

                    <Button
                      variant="destructive"
                      size="icon-xs"
                      onClick={() => handleRemove(item.id)}
                      disabled={pendingRemoveIds.has(item.id)}
                      aria-label={`Remove ${item.variantName} from cart`}
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Separator />

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold text-red-600">
              {formatCurrency(subtotal())} VND
            </span>
          </div>

          <Button
            className="w-full"
            disabled={itemCount === 0}
            onClick={() => {
              setOpen(false);
              router.push("/checkout/cart");
            }}
          >
            Checkout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
