import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Partner, ApiResponse } from "@/lib/types";

// Get all partners
export const usePartners = () => {
  return useQuery({
    queryKey: ["partners"],
    queryFn: async (): Promise<ApiResponse<Partner[]>> => {
      const response = await api.get("/partners");
      return response.data;
    },
    select: data => data.data,
  });
};
