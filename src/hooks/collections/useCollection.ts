import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Collection, ApiResponse } from "@/lib/types";

// Get collection by id
export const useCollection = (locale: string, id: string) => {
  return useQuery({
    queryKey: [`collections-${locale}-${id}`],
    queryFn: async (): Promise<ApiResponse<Collection>> => {
      const response = await api.get(`/collections/${locale}/${id}`);
      return response.data;
    },
    select: data => data.data,
    enabled: !!locale && !!id,
  });
};
