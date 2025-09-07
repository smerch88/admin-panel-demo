import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

// Delete collection
export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      locale,
      id,
    }: {
      locale: string;
      id: string;
      // Не повертає нічого, статус 204
    }): Promise<void> => {
      const response = await api.delete(`/collections/${locale}/${id}`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Remove collection from cache
      queryClient.removeQueries({
        queryKey: [`collections-${variables.locale}-${variables.id}`],
      });
      // Invalidate collections list
      queryClient.invalidateQueries({
        queryKey: [`collections-${variables.locale}`],
      });
    },
  });
};
