import Image from "next/image";
import { Minus, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem as CartItemType } from "@/storefront/cart/types";
import { formatCurrency } from "@/utils";
import {
  useDecreaseCartItemQuantity,
  useIncreaseCartItemQuantity,
  useRemoveCartItem,
} from "@/storefront/cart/mutations";
import { useCartStore } from "@/stores/cart";
import { DEFAULT_IMAGE } from "@/constants";

interface ReviewCartItemProps {
  item: CartItemType;
}

export function ReviewCartItem({ item }: ReviewCartItemProps) {
  const { cart } = useCartStore((state) => state);
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

  const handleIncreaseQuantity = () => {
    if (!cart) return;

    increaseCartItemQuantityMutation.mutate(
      { cartId: cart.id, itemId: item.id },
      {
        onSuccess: () => increaseItemQuantity(item.id),
      },
    );
  };

  const handleDecreaseQuantity = () => {
    if (!cart) return;

    decreaseCartItemQuantityMutation.mutate(
      { cartId: cart.id, itemId: item.id },
      {
        onSuccess: () => decreaseItemQuantity(item.id),
      },
    );
  };

  const handleRemovecartItem = () => {
    if (!cart) return;

    removeCartItemMutation.mutate(
      { cartId: cart.id, itemId: item.id },
      {
        onSuccess: () => removeItem(item.id),
      },
    );
  };

  return (
    <Card key={item.id} className="mb-4">
      <CardContent>
        <div className="flex gap-4">
          <div className="shrink-0">
            <Image
              src={item.imageUrl ?? DEFAULT_IMAGE}
              loading="eager"
              width={100}
              height={100}
              alt=""
              className="rounded object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold mb-2 truncate">{item.variantName}</h3>

            <p className="font-semibold text-base text-red-700 mb-3">
              {formatCurrency(item.salePrice ?? item.price)} VND
            </p>

            <div>
              <Button
                variant="outline"
                size="icon-xs"
                onClick={handleDecreaseQuantity}
                disabled={decreaseCartItemQuantityMutation.isPending}
                aria-label={`Decrease quantity of ${item.variantName}`}
              >
                <Minus />
              </Button>

              <span className="inline-block mx-2">{item.quantity}</span>

              <Button
                variant="outline"
                size="icon-xs"
                onClick={handleIncreaseQuantity}
                disabled={increaseCartItemQuantityMutation.isPending}
                aria-label={`Increase quantity of ${item.variantName}`}
              >
                <Plus />
              </Button>
            </div>
          </div>

          <div className="shrink-0">
            <Button
              variant="destructive"
              size="icon-xs"
              onClick={handleRemovecartItem}
              disabled={removeCartItemMutation.isPending}
              aria-label={`Remove ${item.variantName} from cart`}
            >
              <Trash />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
