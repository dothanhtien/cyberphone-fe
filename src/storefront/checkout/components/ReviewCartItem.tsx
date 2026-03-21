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
        onSuccess(data) {
          increaseItemQuantity(data.id, data.quantity);
        },
      },
    );
  };

  const handleDecreaseQuantity = () => {
    if (!cart) return;

    decreaseCartItemQuantityMutation.mutate(
      { cartId: cart.id, itemId: item.id },
      {
        onSuccess(data) {
          decreaseItemQuantity(data.id, data.quantity);
        },
      },
    );
  };

  const handleRemovecartItem = () => {
    if (!cart) return;

    removeCartItemMutation.mutate(
      { cartId: cart.id, itemId: item.id },
      {
        onSuccess(data) {
          removeItem(data.id);
        },
      },
    );
  };

  return (
    <Card key={item.id} className="mb-4">
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1">
            <Image
              src={item.imageUrl ?? DEFAULT_IMAGE}
              loading="eager"
              width={100}
              height={100}
              alt=""
            />
          </div>

          <div className="col-span-3">
            <h3 className="font-bold mb-3">{item.variantName}</h3>

            <p className="font-semibold text-base text-red-700 mb-3">
              {formatCurrency(item.salePrice ?? item.price)} VND
            </p>

            <div>
              <Button
                variant="outline"
                size="xs"
                onClick={handleDecreaseQuantity}
                disabled={decreaseCartItemQuantityMutation.isPending}
                aria-label={`Decrease quantity of ${item.variantName}`}
              >
                <Minus />
              </Button>

              <span className="inline-block mx-2">{item.quantity}</span>

              <Button
                variant="outline"
                size="xs"
                onClick={handleIncreaseQuantity}
                disabled={increaseCartItemQuantityMutation.isPending}
                aria-label={`Increase quantity of ${item.variantName}`}
              >
                <Plus />
              </Button>
            </div>
          </div>

          <div className="col-span-1 text-right">
            <Button
              variant="destructive"
              size="xs"
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
