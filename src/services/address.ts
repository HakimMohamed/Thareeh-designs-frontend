import { IAddress } from "@/interfaces/address.interface";
import api from "@/lib/api";

export const AddressService = {
  getAddresses: async (): Promise<IAddress[]> => {
    const res = await api.get(`/api/addresses`);
    return res.data.data;
  },
  removeAddress: async (addressId: string): Promise<IAddress[]> => {
    const res = await api.delete(`/api/addresses/address?id=${addressId}`);
    return res.data.data;
  },
  updateAddress: async (address: IAddress): Promise<IAddress[]> => {
    const res = await api.patch(`/api/addresses/address`, address);
    return res.data.data;
  },

  addNewAddress: async (address: IAddress): Promise<IAddress[]> => {
    const res = await api.post(`/api/addresses`, address);
    return res.data.data;
  },
};
