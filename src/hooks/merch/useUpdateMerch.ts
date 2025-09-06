import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { UpdateMerchRequest, Merch } from "@/lib/types";

// Update merch
export const useUpdateMerch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      locale,
      merchData,
    }: {
      locale: string;
      merchData: UpdateMerchRequest;
    }): Promise<Merch> => {
      const response = await api.patch(`/merch/${locale}`, merchData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update merch in cache
      queryClient.setQueryData(["merch", variables.locale], data);
      // Invalidate merch queries
      queryClient.invalidateQueries({ queryKey: ["merch"] });
    },
  });
};
