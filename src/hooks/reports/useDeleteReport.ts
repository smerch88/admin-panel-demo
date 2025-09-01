import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

// Delete report
export const useDeleteReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/reports/${id}`);
      // Delete returns 204 No Content, no response body
    },
    onSuccess: (_, id) => {
      // Remove report from cache
      queryClient.removeQueries({ queryKey: [`reports-${id}`] });
      // Invalidate all reports lists since we don't know the language
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};
