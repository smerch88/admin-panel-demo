import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { UpdateUserRequest, User, ApiResponse } from "@/lib/types";

// Update user hook
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      userData,
    }: {
      userId: string;
      userData: UpdateUserRequest;
    }): Promise<ApiResponse<User>> => {
      const response = await api.patch(`/auth/users/${userId}`, userData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update user in cache
      queryClient.setQueryData([`auth-user-${variables.userId}`], data);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: ["auth-users"] });
    },
  });
};
