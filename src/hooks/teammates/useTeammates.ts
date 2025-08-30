import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Teammate, ApiResponse } from "@/lib/types";

// Get teammates by locale
export const useTeammates = (locale: string = "ua") => {
  return useQuery({
    queryKey: [`teammates-${locale}`],
    queryFn: async (): Promise<ApiResponse<Teammate[]>> => {
      const response = await api.get("/teammates", {
        params: { locale },
      });
      return response.data;
    },
    select: data => data.data,
  });
};
