/* eslint-disable @typescript-eslint/no-unused-vars */
import { IFormattedCart } from "@/interfaces/cart.interface";
import api from "@/lib/api";
import { create } from "zustand";

interface CartState {
  cart: IFormattedCart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
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
  isLoading: false,
  fetchCart: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get(`/api/cart`);
      set({ cart: response.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));

export default useCartStore;
