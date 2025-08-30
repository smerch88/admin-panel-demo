import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CreateCollectionRequest, Collection, ApiResponse } from "@/lib/types";

// Create collection
export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      locale,
      collectionData,
    }: {
      locale: string;
      collectionData: CreateCollectionRequest;
    }): Promise<ApiResponse<Collection>> => {
      // Create FormData for multipart/form-data
      const formData = new FormData();

      // Add all fields to FormData
      Object.entries(collectionData).forEach(([key, value]) => {
        if (key === "long_desc" && Array.isArray(value)) {
          // Handle array of strings for long_desc
          value.forEach((item, index) => {
            formData.append(`long_desc[${index}]`, item);
          });
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const response = await api.post(`/collections/${locale}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate collections list for the locale
      queryClient.invalidateQueries({
        queryKey: [`collections-${variables.locale}`],
      });
    },
  });
};
