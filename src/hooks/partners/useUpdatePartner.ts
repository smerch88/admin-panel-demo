import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { UpdatePartnerRequest, Partner, ApiResponse } from "@/lib/types";

// Update partner
export const useUpdatePartner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      partnerData,
    }: {
      id: string;
      partnerData: UpdatePartnerRequest;
    }): Promise<ApiResponse<Partner>> => {
      // Create FormData for multipart/form-data
      const formData = new FormData();

      // Add all fields to FormData
      Object.entries(partnerData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const response = await api.patch(`/partners/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update partner in cache
      queryClient.setQueryData([`partners-${variables.id}`], data);
      // Invalidate partners list
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
};
