import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Merch, ApiResponse } from "@/lib/types";

// Get merch content
export const useMerch = () => {
  return useQuery({
    queryKey: ["merch"],
    queryFn: async (): Promise<ApiResponse<Merch[]>> => {
      const response = await api.get("/merch");
      return response.data;
    },
    select: data => data.data,
  });
};
