import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { UpdateStatsRequest } from "@/lib/types";

// Update stats hook
export const useUpdateStats = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateStatsRequest): Promise<void> => {
      await api.put("/stats", data);
      // PUT returns 204 No Content, no response body
    },
    onSuccess: () => {
      // Invalidate and refetch stats data
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
};
