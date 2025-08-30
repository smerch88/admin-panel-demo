import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { UpdateCollectionRequest, Collection, ApiResponse } from "@/lib/types";

// Update collection
export const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      locale,
      id,
      collectionData,
    }: {
      locale: string;
      id: string;
      collectionData: UpdateCollectionRequest;
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

      const response = await api.patch(
        `/collections/${locale}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update collection in cache
      queryClient.setQueryData(
        [`collections-${variables.locale}-${variables.id}`],
        data
      );
      // Invalidate collections list
      queryClient.invalidateQueries({
        queryKey: [`collections-${variables.locale}`],
      });
    },
  });
};
