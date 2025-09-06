import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Merch } from "@/lib/types";

// Get all merch content
export const useAllMerch = () => {
  return useQuery({
    queryKey: ["merch"],
    queryFn: async (): Promise<Merch[]> => {
      const response = await api.get("/merch");
      return response.data;
    },
  });
};

// Get merch content for a specific locale
export const useMerch = (locale: string) => {
  return useQuery({
    queryKey: ["merch", locale],
    queryFn: async (): Promise<Merch> => {
      const response = await api.get("/merch");
      const allMerch: Merch[] = response.data;
      // Find the merch data for the specific locale
      const merchForLocale = allMerch.find(merch => merch.locale === locale);
      if (!merchForLocale) {
        throw new Error(`Merch data not found for locale: ${locale}`);
      }
      return merchForLocale;
    },
  });
};
