import { IAddress } from "@/interfaces/address.interface";
import { IOrder } from "@/interfaces/order.interface";
import api from "@/lib/api";

export const OrdersService = {
  createOrder: async ({
    paymentMethod,
    saveInfo,
    address,
  }: {
    paymentMethod: string;
    saveInfo: boolean;
    address: IAddress;
  }) => {
    console.log("address", address);
    return api.post(`/api/orders/order`, {
      paymentMethod,
      saveInfo,
      address,
    });
  },
  getOrderById: async (id: string): Promise<IOrder> => {
    const res = await api.get(`/api/orders/order?id=${id}`);
    return res.data.data;
  },

  getOrders: async (page: number, pageSize: number) => {
    const res = await api.get(`/api/orders?page=${page}&pageSize=${pageSize}`);
    return res.data.data;
  },
};
