/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { addToCart } from "@/actions/cart";
import { useAuthModal } from "@/stores/auth-modal";
import useCartStore from "@/stores/cart";
import { Button } from "@nextui-org/react";
import { useTransition } from "react";

export default function AddToCartButton({
  itemId,
  props,
}: {
  itemId: string;
  props?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { fetchCart } = useCartStore();
  const { setIsOpen } = useAuthModal();

  const handleAddToCart = async () => {
    startTransition(async () => {
      try {
        await addToCart(itemId);
        await fetchCart();
      } catch (error) {
        setIsOpen(true);
      }
    });
  };

  return (
    <Button
      onClick={handleAddToCart}
      isLoading={isPending}
      disabled={isPending}
      className={props}
    >
      Add to Cart
    </Button>
  );
}
