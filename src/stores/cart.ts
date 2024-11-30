/* eslint-disable @typescript-eslint/no-unused-vars */
import { IFormattedCart } from "@/interfaces/cart.interface";
import api from "@/lib/api";
import { create } from "zustand";

interface CartState {
  cart: IFormattedCart | null;
  isLoading: boolean;
  fetchCart: () => Promise<IFormattedCart | null>;
  removeItemFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useCartStore = create<CartState>((set, get) => ({
  cart: {
    _id: "",
    _user: "",
    items: [],
    price: 0,
    originalPrice: 0,
  },
  isLoading: true,
  fetchCart: async (): Promise<IFormattedCart | null> => {
    try {
      const response = await api.get(`/api/cart`);
      set({ cart: response.data.data, isLoading: false });
      return response.data.data;
    } catch (error) {
      console.log("axios error", error);
      set({ isLoading: false });
      return null;
    }
  },
  removeItemFromCart: async (itemId: string) => {
    try {
      await api.delete(`/api/cart/item`, { data: { itemId } });
      set({ isLoading: false });
      get().fetchCart();
    } catch (error) {
      set({ isLoading: false });
      console.error("Failed to remove item:", error);
    }
  },
  updateQuantity: async (itemId: string, quantity: number) => {
    try {
      await api.patch(`/api/cart/item`, {
        itemId,
        quantity,
      });
      set({ isLoading: false });
      get().fetchCart();
    } catch (error) {
      set({ isLoading: false });
      console.error("Failed to update quantity:", error);
    }
  },
}));

export default useCartStore;
