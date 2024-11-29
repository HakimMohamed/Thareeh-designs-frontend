"use server";

import api from "@/lib/api";

export async function addToCart(id: string) {
  try {
    await api.post(`/api/cart/item`, {
      itemId: id,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
