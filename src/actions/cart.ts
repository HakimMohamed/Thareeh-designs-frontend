"use server";

import api from "@/lib/api";

export async function addToCart(id: string) {
  await api.post(`/api/cart/item`, {
    itemId: id,
  });
}
