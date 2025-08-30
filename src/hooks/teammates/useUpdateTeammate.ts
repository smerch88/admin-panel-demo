import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { UpdateTeammateRequest, Teammate, ApiResponse } from "@/lib/types";

// Update teammate
export const useUpdateTeammate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      locale,
      teammateData,
    }: {
      id: string;
      locale: string;
      teammateData: UpdateTeammateRequest;
    }): Promise<ApiResponse<Teammate>> => {
      // Create FormData for multipart/form-data
      const formData = new FormData();

      // Add all fields to FormData
      Object.entries(teammateData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const response = await api.patch(
        `/teammates/${id}?locale=${locale}`,
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
      // Update teammate in cache
      queryClient.setQueryData([`teammates-${variables.id}`], data);
      // Invalidate teammates list for the specific language
      queryClient.invalidateQueries({
        queryKey: [`teammates-${data.data.locale}`],
      });
    },
  });
};
