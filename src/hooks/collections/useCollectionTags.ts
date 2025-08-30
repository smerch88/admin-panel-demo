import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CollectionTag, ApiResponse } from "@/lib/types";

// Get collection tags
export const useCollectionTags = () => {
  return useQuery({
    queryKey: ["collections-tags"],
    queryFn: async (): Promise<ApiResponse<CollectionTag[]>> => {
      const response = await api.get("/collections/tags");
      return response.data;
    },
    select: data => data.data,
  });
};
