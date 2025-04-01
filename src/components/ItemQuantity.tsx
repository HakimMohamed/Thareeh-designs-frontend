/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import useCartStore from "@/stores/cart";
import { useMemo } from "react";

export default function ItemQuantity({
  itemId,
  props,
}: {
  itemId: string;
  props?: string;
}) {
  const { cart } = useCartStore();

  const item = useMemo(
    () => cart?.items.find((item) => item._id === itemId) || null,
    [cart, itemId]
  );

  return (item?.quantity ?? 0) > 0 ? (
    <div className="absolute bottom-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg z-50">
      {item?.quantity}
    </div>
  ) : null;
}
