import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { PaginatedCollectionsResponse } from "@/lib/types";

// Get collections by locale with pagination
export const useCollections = (
  locale: string,
  page: number = 1,
  perPage: number = 6
) => {
  return useQuery({
    queryKey: [`collections-${locale}-${page}-${perPage}`],
    queryFn: async (): Promise<PaginatedCollectionsResponse> => {
      const response = await api.get(`/collections/${locale}`, {
        params: { page, perPage },
      });
      return response.data;
    },
  });
};
