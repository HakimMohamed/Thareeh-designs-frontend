"use client";

import { addToCart } from "@/actions/cart";
import { Button } from "@nextui-org/react";
import { useTransition } from "react";

export default function AddToCartButton({ itemId }: { itemId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      addToCart(itemId);
    });
  };

  return (
    <Button
      onClick={handleAddToCart}
      isLoading={isPending}
      disabled={isPending}
      className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors text-sm font-medium"
    >
      Add to Cart
    </Button>
  );
}
