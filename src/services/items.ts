import { Item } from "@/interfaces/Item.interface";
import api from "@/lib/api";

export const ItemService = {
  getItemsSearchResults: async (text: string): Promise<Item[]> => {
    const res = await api.get(`/api/items/search?text=${text}`);
    return res.data.data;
  },
};
