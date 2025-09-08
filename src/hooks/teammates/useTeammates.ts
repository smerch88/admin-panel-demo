import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Teammate } from "@/lib/types";

// Get teammates by locale
export const useTeammates = (locale: string = "ua") => {
  return useQuery({
    queryKey: ["teammates", locale],
    queryFn: async (): Promise<Teammate[]> => {
      const response = await api.get("/teammates", {
        params: { locale },
      });

      // Handle the actual API response structure
      const data = response.data;

      // If it's an array with locale/teammates structure, extract teammates
      if (Array.isArray(data) && data.length > 0 && data[0].teammates) {
        return data[0].teammates.map((teammate: Teammate) => ({
          ...teammate,
          locale: data[0].locale, // Add locale to each teammate
        }));
      }

      // If it's already an array of teammates, return as is
      if (Array.isArray(data)) {
        return data.map((teammate: Teammate) => ({
          ...teammate,
          locale: locale as "en" | "ua", // Add locale to each teammate
        }));
      }

      // Fallback: return empty array
      return [];
    },
  });
};
