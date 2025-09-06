import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { UpdateTeammateRequest, Teammate } from "@/lib/types";

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
    }): Promise<Teammate> => {
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
      queryClient.setQueryData(["teammates", variables.id], data);
      // Invalidate all teammates queries to update all lists
      queryClient.invalidateQueries({
        queryKey: ["teammates"],
      });
    },
  });
};
