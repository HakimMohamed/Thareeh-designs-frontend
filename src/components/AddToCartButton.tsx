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
  const { setSignInIsOpen } = useAuthModal();

  const handleAddToCart = async () => {
    startTransition(async () => {
      try {
        await addToCart(itemId);
        await fetchCart();
      } catch (error) {
        console.log(error);
        setSignInIsOpen(true);
      }
    });
  };

  return (
    <Button
      onPress={handleAddToCart}
      isLoading={isPending}
      disabled={isPending}
      className={props}
    >
      Add to Cart
    </Button>
  );
}
