import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Stats } from "@/lib/types";

// Get stats hook
export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async (): Promise<Stats> => {
      const response = await api.get("/stats");
      return response.data;
    },
  });
};
