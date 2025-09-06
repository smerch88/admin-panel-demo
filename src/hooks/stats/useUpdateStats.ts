import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { UpdateStatsRequest, ApiResponse } from "@/lib/types";

// Update stats hook
export const useUpdateStats = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: UpdateStatsRequest
    ): Promise<ApiResponse<void>> => {
      const response = await api.put("/stats", data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch stats data
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
};
