import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

// Delete teammate
export const useDeleteTeammate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      locale,
    }: {
      id: string;
      locale: string;
    }): Promise<void> => {
      await api.delete(`/teammates/${id}?locale=${locale}`);
      // Delete returns 204 No Content, no response body
    },
    onSuccess: (_, variables) => {
      // Remove teammate from cache
      queryClient.removeQueries({
        queryKey: ["teammates", variables.id],
      });
      // Invalidate all teammates queries to update all lists
      queryClient.invalidateQueries({
        queryKey: ["teammates"],
      });
    },
  });
};
