import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CreateTeammateRequest, Teammate } from "@/lib/types";

// Create teammate
export const useCreateTeammate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      teammateData: CreateTeammateRequest
    ): Promise<Teammate> => {
      // Create FormData for multipart/form-data
      const formData = new FormData();

      // Add all fields to FormData
      Object.entries(teammateData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const response = await api.post("/teammates", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: data => {
      // Invalidate all teammates queries to update all lists
      queryClient.invalidateQueries({
        queryKey: ["teammates"],
      });
    },
  });
};
