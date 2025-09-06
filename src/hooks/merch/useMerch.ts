import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Merch } from "@/lib/types";

// Get merch content for a specific locale
export const useMerch = (locale: string) => {
  return useQuery({
    queryKey: ["merch", locale],
    queryFn: async (): Promise<Merch> => {
      const response = await api.get(`/merch/${locale}`);
      return response.data;
    },
  });
};
