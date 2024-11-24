import { IFormattedCart } from "@/interfaces/cart.interface";
import api from "@/lib/api";
import { create } from "zustand";

interface CartState {
  cart: IFormattedCart | null;
  fetchCart: () => Promise<void>;
}

const useCartStore = create<CartState>((set) => ({
  cart: {
    _id: "",
    _user: "",
    items: [],
    price: 0,
    originalPrice: 0,
  },
  fetchCart: async () => {
    const response = await api.get(`/api/cart`);
    set({ cart: response.data.data });
  },
}));

export default useCartStore;
