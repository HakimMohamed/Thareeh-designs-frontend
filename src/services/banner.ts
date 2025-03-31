import api from "@/lib/api";

export const BannerService = {
  getBannerSettings: async (): Promise<{
    text: string;
    color: string;
    textColor: string;
  } | null> => {
    try {
      const res = await api.get(`/api/banner-settings`);
      return res.data.data as {
        text: string;
        color: string;
        textColor: string;
      };
    } catch (error) {
      console.error("Error fetching banner settings:", error);
      return null;
    }
  },
};
