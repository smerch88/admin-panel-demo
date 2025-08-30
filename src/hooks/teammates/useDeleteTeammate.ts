import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/types";

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
        queryKey: [`teammates-${variables.id}`],
      });
      // Invalidate teammates list for the specific language
      queryClient.invalidateQueries({
        queryKey: [`teammates-${variables.locale}`],
      });
    },
  });
};
