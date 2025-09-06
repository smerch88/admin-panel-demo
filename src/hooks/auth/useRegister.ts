import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { RegisterRequest, User } from "@/lib/types";

// Register hook (admin only - for creating new users)
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<User> => {
      const response = await api.post("/auth/register", userData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["auth-users"] });
    },
  });
};
