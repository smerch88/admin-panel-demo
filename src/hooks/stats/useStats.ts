import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Stats, ApiResponse } from "@/lib/types";

// Get stats hook
export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async (): Promise<ApiResponse<Stats>> => {
      const response = await api.get("/stats");
      return response.data;
    },
    select: data => data.data,
  });
};
