import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

// Delete partner
export const useDeletePartner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/partners/${id}`);
      // Delete returns 204 No Content, no response body
    },
    onSuccess: (_, id) => {
      // Remove partner from cache
      queryClient.removeQueries({ queryKey: [`partners-${id}`] });
      // Invalidate partners list
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
};
